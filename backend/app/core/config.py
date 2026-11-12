from pathlib import Path
from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parents[2]  # points to backend/


class Settings(BaseSettings):
    PROJECT_NAME: str = "FireWatch AI Backend"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"

    # Environment
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    MOCK_MODE_ENABLED: bool = True

    # CORS
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "*"
    ]

    # Database
    POSTGRES_SERVER: str = "localhost"
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = "postgres"
    POSTGRES_DB: str = "firewatch"
    POSTGRES_PORT: int = 5433

    @property
    def SQLALCHEMY_DATABASE_URI(self) -> str:
        return f"postgresql://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_SERVER}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"

    # Weather & Satellite API keys
    OPENWEATHER_API_KEY: str = ""
    NASA_FIRMS_MAP_KEY: str = ""

    model_config = SettingsConfigDict(
        case_sensitive=True,
        env_file=str(BASE_DIR / ".env"),
        extra="ignore"
    )


settings = Settings()