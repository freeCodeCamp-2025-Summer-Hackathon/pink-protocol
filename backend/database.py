import os
from dotenv import load_dotenv

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# This is to get a connection string (stored in an environment variable) for a DB. how do we want to do it in our project? 
# TODO: Identify how to access 
file_path = os.path.abspath(__file__)
env_file_path = os.path.abspath(os.path.join(file_path,"..","..",".env"))
load_dotenv(env_file_path)
db_url = os.getenv("DATABASE_URL")

engine = create_engine(db_url, echo=False) # Set echo to false for quiet output
SessionLocal = sessionmaker(bind=engine)

# This function is used in our `main.py` endpoints as the "session" used to make queries. could also name it "get_db()"
def get_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()