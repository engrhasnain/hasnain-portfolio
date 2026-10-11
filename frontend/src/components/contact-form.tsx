"use client";

import { useState, type FormEvent } from "react";
import { services } from "@/lib/services";
import { ArrowRight, Check } from "./icons";

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "sent"; message: string }
  | { state: "error"; message: string };

type ApiError = { detail?: string | { msg?: string; loc?: (string | number)[] }[] };

function errorMessage(body: ApiError | null, fallback: string): string {
  if (!body?.detail) return fallback;
  if (typeof body.detail === "string") return body.detail;
  const first = body.detail[0];
  const field = first?.loc?.at(-1);
  return first?.msg ? `${field ? `${field}: ` : ""}${first.msg.replace(/^Value error, /, "")}` : fallback;
}

/** Posts to /api/contact, which Next.js proxies to the FastAPI backend. */
export function ContactForm({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await res.json().catch(() => null)) as (ApiError & { message?: string }) | null;
      if (!res.ok) throw new Error(errorMessage(body, "Something went wrong."));
      form.reset();
      setStatus({ state: "sent", message: body?.message ?? "Thanks! I'll get back to you soon." });
    } catch (err) {
      const reason = err instanceof Error && err.message !== "Failed to fetch" ? err.message : "The form is offline.";
      setStatus({ state: "error", message: reason });
    }
  }

  if (status.state === "sent") {
    return (
      <div role="status" className="card flex flex-col items-start gap-4 p-8">
        <span className="grid size-12 place-items-center rounded-full bg-brand text-2xl text-night">
          <Check />
        </span>
        <h2 className="text-2xl">Message sent</h2>
        <p className="text-muted">{status.message}</p>
        <button type="button" className="link text-sm" onClick={() => setStatus({ state: "idle" })}>
          Send another message
        </button>
      </div>
    );
  }

  const sending = status.state === "sending";

  return (
    <form onSubmit={onSubmit} className="card relative flex flex-col gap-5 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium">
          Your name
          <input name="name" required minLength={2} maxLength={100} autoComplete="name" className="field" />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium">
          Email
          <input name="email" type="email" required autoComplete="email" className="field" />
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium">
          Company <span className="sr-only">(optional)</span>
          <input
            name="company"
            maxLength={120}
            autoComplete="organization"
            placeholder="Optional"
            className="field"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium">
          What do you need?
          <select name="service" defaultValue="" className="field">
            <option value="">Not sure yet</option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="flex flex-col gap-2 text-sm font-medium">
        What should it do?
        <textarea
          name="message"
          required
          minLength={20}
          maxLength={5000}
          rows={6}
          placeholder="A few lines about the problem, your current tools and your timeline."
          className="field resize-y"
        />
      </label>

      {/* Honeypot: hidden from people, bots fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={sending} className="btn btn-primary disabled:opacity-60">
          {sending ? "Sending…" : "Send message"} {!sending && <ArrowRight />}
        </button>
        <p aria-live="polite" className="text-sm text-muted">
          {status.state === "error" ? (
            <span className="text-ink">
              {status.message} Email me at{" "}
              <a href={`mailto:${email}`} className="text-teal underline underline-offset-4">
                {email}
              </a>
              .
            </span>
          ) : (
            "Your details are only used to reply to you."
          )}
        </p>
      </div>
    </form>
  );
}
