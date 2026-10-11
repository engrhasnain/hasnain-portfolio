from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    environment: str = "development"
    allowed_origins: str = "http://localhost:3000"
    resend_api_key: str | None = None
    contact_to_email: str | None = None
    contact_from_email: str = "Portfolio <onboarding@resend.dev>"
    rate_limit_per_hour: int = 5

    @property
    def is_production(self) -> bool:
        return self.environment.lower() == "production"

    @property
    def origins(self) -> list[str]:
        return [o.strip().rstrip("/") for o in self.allowed_origins.split(",") if o.strip()]

    @property
    def email_configured(self) -> bool:
        return bool(self.resend_api_key and self.contact_to_email)


@lru_cache
def get_settings() -> Settings:
    return Settings()
