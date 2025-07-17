import re

import sqlalchemy as sa
from fastapi import Depends, HTTPException, status

from . import models
from .database import get_session

# TODO: Define additional helper functions.
# TODO: Consider creating helper_functions directory so helper functions can be defined cleanly on a per-table level.


# User related helpers
def validate_email(
    session: sa.orm.Session, email: str
):  # This may not be needed since we use EmailStr typing in pydantic schema
    err = None
    if not validate_email_regex(email):
        err = "invalid email format"

    if not validate_email_unique(session, email):
        err = "a user with this email already exists"

    return err


def validate_email_regex(
    email,
):  # This may not be needed since we use EmailStr typing in pydantic schema
    pattern = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"

    if re.match(pattern, email):
        return True

    return False


def validate_email_unique(session: sa.orm.Session, email: str):
    # There is an email constraint on the users table, so this may not be necessary
    statement = sa.select(models.User).where(models.User.email == email)
    if session.scalars(statement).first() is None:
        return True
    return False


def validate_password(session: sa.orm.Session, password: str):
    # ...
    return True


def validate_username(session: sa.orm.Session, username: str):
    err = None
    user = session.query(models.User).filter_by(username=username).first()
    if user is not None:
        err = f'Username "{username}" is taken'
    return err


def validate_is_user(session: sa.orm.Session, user_id: int):
    err = None
    user = session.query(models.User).filter_by(id=user_id).first()
    if user is None:
        err = f"User {user_id} does not exist"
    return err


# Post related helpers
def validate_is_post(session: sa.orm.Session, post_id: int):
    err = None
    post = session.query(models.Post).filter_by(id=post_id).first()
    if post is None:
        err = f"Post {post_id} does not exist"
    return err


def validate_post_fields(name: str, caption: str):
    # TODO: Include check for content also once we determine how and what thats going to look like
    err = None
    if not name or name.strip() == "":
        err = "Post name is required"
    elif not caption or caption.strip() == "":
        err = "Post caption is required"
    return err


def validate_post_name(session: sa.orm.Session, name: str):
    err = None
    post = session.query(models.Post).filter_by(name=name).first()
    if post is not None:
        err = f'Post name "{name}" is already in use'
    return err


def get_current_user(session: sa.orm.Session = Depends(get_session)) -> models.User:
    try:
        current_user = models.User(
            id=models.User.id,
            name=models.User.name,
            username=models.User.username,
            email=models.User.email,
            password_hash=models.User.password_hash,
            # Not sure if I need created_at and updated_at here
            created_at=models.User.created_at,
            updated_at=models.User.updated_at,
        )

        return current_user

    except Exception as e:
        print(f"Authentication dependency error: {e}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
