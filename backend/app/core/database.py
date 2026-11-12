import logging
from typing import Generator
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from backend.app.core.config import settings

logger = logging.getLogger(__name__)

Base = declarative_base()

try:
    engine = create_engine(
        settings.SQLALCHEMY_DATABASE_URI,
        pool_pre_ping=True,
        echo=False
    )
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
except Exception as e:
    logger.warning(f"Database connection setup warning: {e}. Running in standalone mock mode.")
    engine = None
    SessionLocal = None


def get_db() -> Generator:
    """Dependency for getting DB session with automatic teardown."""
    if SessionLocal is None:
        yield None
        return
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db() -> None:
    """Create PostGIS extensions and all SQLAlchemy tables."""
    if engine is None:
        logger.warning("Skipping DB table creation: engine is None.")
        return
    from sqlalchemy import text
    import backend.app.models  # noqa: F401 - registers all models on Base

    with engine.begin() as conn:
        conn.execute(text("CREATE EXTENSION IF NOT EXISTS postgis;"))
        conn.execute(text('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'))
    Base.metadata.create_all(bind=engine)
    logger.info("Database tables verified/created successfully.")