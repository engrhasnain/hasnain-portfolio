from pydantic import BaseModel, ConfigDict, EmailStr, Field


class ContactRequest(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    company: str | None = Field(default=None, max_length=120)
    service: str | None = Field(default=None, max_length=60)
    message: str = Field(min_length=20, max_length=5000)
    # Honeypot: hidden in the form, so only bots fill it in.
    website: str | None = Field(default=None, max_length=200)


class ContactResponse(BaseModel):
    ok: bool
    message: str
