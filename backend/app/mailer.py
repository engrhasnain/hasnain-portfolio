import html

import httpx

from .config import Settings
from .schemas import ContactRequest

RESEND_URL = "https://api.resend.com/emails"


class EmailError(Exception):
    pass


def render(payload: ContactRequest) -> tuple[str, str]:
    rows = [
        ("Name", payload.name),
        ("Email", str(payload.email)),
        ("Company", payload.company or "-"),
        ("Service", payload.service or "Not sure yet"),
    ]
    text = "\n".join(f"{label}: {value}" for label, value in rows) + f"\n\n{payload.message}\n"
    html_rows = "".join(
        f'<tr><td style="padding:4px 12px 4px 0;color:#8B90A8">{label}</td><td>{html.escape(value)}</td></tr>'
        for label, value in rows
    )
    body = html.escape(payload.message).replace("\n", "<br>")
    return text, f'<table>{html_rows}</table><p style="margin-top:16px">{body}</p>'


async def send_contact_email(payload: ContactRequest, settings: Settings) -> None:
    text, html_body = render(payload)
    subject = f"Portfolio: {payload.service or 'New message'} from {payload.name}"
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            res = await client.post(
                RESEND_URL,
                headers={"Authorization": f"Bearer {settings.resend_api_key}"},
                json={
                    "from": settings.contact_from_email,
                    "to": [settings.contact_to_email],
                    "reply_to": str(payload.email),
                    "subject": subject[:150],
                    "text": text,
                    "html": html_body,
                },
            )
    except httpx.HTTPError as exc:
        raise EmailError(f"Resend request failed: {exc}") from exc
    if res.status_code >= 400:
        raise EmailError(f"Resend returned {res.status_code}: {res.text[:300]}")
