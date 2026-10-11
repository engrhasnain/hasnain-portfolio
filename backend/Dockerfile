# Optional: run the API on Render, Railway, Fly.io or any Docker host instead of Vercel.
FROM python:3.13-slim
WORKDIR /srv
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt "uvicorn[standard]>=0.30"
COPY app ./app
ENV ENVIRONMENT=production
EXPOSE 8000
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000} --proxy-headers"]
