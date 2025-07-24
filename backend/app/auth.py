from datetime import datetime, timedelta, UTC
from jose import jwt, JWTError
from .config import settings

ALGORITHM = settings.algorithm
ACCESS_EXPIRE = timedelta(
    minutes=settings.access_token_expire_minutes
)


def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    to_encode["exp"] = datetime.now(UTC) + ACCESS_EXPIRE
    return jwt.encode(to_encode, settings.secret_key, algorithm=ALGORITHM)


def verify_token(token: str):
    try:
        return jwt.decode(token, settings.secret_key, algorithms=[ALGORITHM])
    except JWTError:
        return None
