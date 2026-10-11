import pytest
from fastapi.testclient import TestClient

from app import main
from app.config import Settings, get_settings

VALID = {
    "name": "Sara",
    "email": "sara@example.com",
    "company": "Acme",
    "service": "AI chatbot",
    "message": "We need a chatbot trained on our product documents.",
}


@pytest.fixture
def client():
    main.limiter.reset()
    main.app.dependency_overrides[get_settings] = lambda: Settings(environment="development")
    yield TestClient(main.app)
    main.app.dependency_overrides.clear()


def test_health(client):
    assert client.get("/api/health").json() == {"status": "ok"}


def test_contact_dev_mode_logs_without_email(client):
    res = client.post("/api/contact", json=VALID)
    assert res.status_code == 200
    assert res.json()["ok"] is True


def test_contact_validation(client):
    res = client.post("/api/contact", json={**VALID, "email": "not-an-email", "message": "short"})
    assert res.status_code == 422


def test_honeypot_is_silently_accepted(client):
    res = client.post("/api/contact", json={**VALID, "website": "http://spam.example"})
    assert res.status_code == 200


def test_rate_limit(client):
    for _ in range(main.limiter.limit):
        assert client.post("/api/contact", json=VALID).status_code == 200
    assert client.post("/api/contact", json=VALID).status_code == 429


def test_production_without_email_config_returns_503(client):
    main.app.dependency_overrides[get_settings] = lambda: Settings(
        environment="production", resend_api_key=None, contact_to_email=None
    )
    assert client.post("/api/contact", json=VALID).status_code == 503
