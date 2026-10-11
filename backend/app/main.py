import logging

from fastapi import Depends, FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware

from .config import Settings, get_settings
from .mailer import EmailError, send_contact_email
from .rate_limit import RateLimiter
from .schemas import ContactRequest, ContactResponse

logger = logging.getLogger("portfolio")
logging.basicConfig(level=logging.INFO)

settings = get_settings()

app = FastAPI(
    title="Hasnain Pirzada Portfolio API",
    version="1.0.0",
    docs_url=None if settings.is_production else "/api/docs",
    redoc_url=None,
    openapi_url=None if settings.is_production else "/api/openapi.json",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origins,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

limiter = RateLimiter(limit=settings.rate_limit_per_hour)


def client_ip(request: Request) -> str:
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/api/contact", response_model=ContactResponse)
async def contact(
    payload: ContactRequest,
    request: Request,
    settings: Settings = Depends(get_settings),
) -> ContactResponse:
    # Behind the Next.js proxy many visitors can share one IP, so the key also includes the sender's email.
    if not limiter.allow(f"{client_ip(request)}|{str(payload.email).lower()}"):
        raise HTTPException(status_code=429, detail="Too many messages. Please try again in an hour.")

    if payload.website:
        # Honeypot filled in: pretend it worked so the bot moves on.
        logger.info("Dropped contact form spam from %s", client_ip(request))
        return ContactResponse(ok=True, message="Thanks! I'll get back to you soon.")

    if not settings.email_configured:
        if settings.is_production:
            logger.error("Contact form used but RESEND_API_KEY / CONTACT_TO_EMAIL are not set")
            raise HTTPException(status_code=503, detail="The contact form isn't set up yet.")
        logger.info("Contact form (dev, email not configured): %s", payload.model_dump(exclude={"website"}))
        return ContactResponse(ok=True, message="Thanks! (Dev mode: your message was logged, not emailed.)")

    try:
        await send_contact_email(payload, settings)
    except EmailError:
        logger.exception("Failed to send contact email")
        raise HTTPException(status_code=502, detail="Your message couldn't be sent right now.")

    return ContactResponse(ok=True, message="Thanks! Your message is in my inbox. I'll get back to you soon.")
