"use client";

import { useState, type FormEvent } from "react";
import { services } from "@/lib/services";
import { ArrowRight, Check, Mail } from "./icons";

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
      <div role="status" className="card-feature flex flex-col items-start gap-4 p-7 sm:p-9">
        <span className="icon-tile">
          <Check />
        </span>
        <h2 className="mt-2 text-2xl sm:text-[1.75rem]">Message sent</h2>
        <p className="leading-relaxed text-ink/70">{status.message}</p>
        <button type="button" className="btn btn-ghost btn-sm mt-2" onClick={() => setStatus({ state: "idle" })}>
          Send another message
        </button>
      </div>
    );
  }

  const sending = status.state === "sending";

  return (
    <form onSubmit={onSubmit} className="card-feature flex flex-col gap-5 p-6 sm:p-9">
      <div className="mb-1 flex items-start gap-4">
        <span className="icon-tile">
          <Mail />
        </span>
        <div>
          <h2 className="text-2xl sm:text-[1.75rem]">Send a message</h2>
          <p className="mt-1 text-sm text-ink/55">A few lines is enough to get started.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-semibold text-ink/85">
          Your name
          <input name="name" required minLength={2} maxLength={100} autoComplete="name" className="field" />
        </label>
        <label className="flex flex-col gap-2 text-sm font-semibold text-ink/85">
          Email
          <input name="email" type="email" required autoComplete="email" className="field" />
        </label>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-semibold text-ink/85">
          Company <span className="sr-only">(optional)</span>
          <input
            name="company"
            maxLength={120}
            autoComplete="organization"
            placeholder="Optional"
            className="field"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-semibold text-ink/85">
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
      <label className="flex flex-col gap-2 text-sm font-semibold text-ink/85">
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

      <div className="mt-1 flex flex-col gap-4 border-t border-white/[0.07] pt-6 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={sending} className="btn btn-primary disabled:opacity-60">
          {sending ? "Sending…" : "Send message"} {!sending && <ArrowRight />}
        </button>
        <p aria-live="polite" className="text-sm text-ink/55">
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
