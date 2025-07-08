from .config import settings
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = f'postgresql://{settings.database_username}:{settings.database_password}@{settings.database_hostname}:{settings.database_port}/{settings.database_name}'

engine = create_engine(DATABASE_URL, echo=False) # Set echo to false for quiet output
SessionLocal = sessionmaker(bind=engine)

# This function is used in our `main.py` endpoints as the "session" used to make queries. could also name it "get_db()"
def get_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()