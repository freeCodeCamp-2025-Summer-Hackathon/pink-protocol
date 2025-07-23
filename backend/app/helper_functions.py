import sqlalchemy as sa
from fastapi import Depends, HTTPException, Request, status
from passlib.hash import pbkdf2_sha256

from . import models
from .database import get_session

# TODO: Consider creating helper_functions directory so helper functions can be defined cleanly on a per-table level.


# User related helpers
def validate_email(session: sa.orm.Session, email: str):
    err = None
    if not validate_email_unique(session, email):
        err = "a user with this email already exists"

    return err


def validate_email_unique(session: sa.orm.Session, email: str):
    # There is an email constraint on the users table, so this may not be necessary
    statement = sa.select(models.User).where(models.User.email == email)
    if session.scalars(statement).first() is None:
        return True
    return False


def validate_password(
    session: sa.orm.Session, password: str, username: str = None, email: str = None
):
    err = None
    password_valid = False
    user = None

    if username is not None:
        user = session.query(models.User).filter_by(username=username).first()
        if user is None:
            err = "Incorrect username"
            return err

    if email is not None:
        user = session.query(models.User).filter_by(email=email).first()
        if user is None:
            err = "Incorrect email"
            return err

    password_valid = pbkdf2_sha256.verify(password, user.password_hash)

    if not password_valid:
        err = "Incorrect password"

    return err


def validate_username(session: sa.orm.Session, username: str):
    err = None
    user = session.query(models.User).filter_by(username=username).first()
    if user is not None:
        err = f'Username "{username}" is taken'
    return err


# Optional arguments added to be able to reuse function for multiple different user validation checks
def validate_is_user(
    session: sa.orm.Session,
    user_id: int = None,
    username: str = None,
    email: str = None,
):
    err = None

    if user_id is not None:
        id = session.query(models.User).filter_by(id=user_id).first()
        if id is None:
            err = f"User id: {id} does not exist"

    elif username is not None:
        username = session.query(models.User).filter_by(username=username).first()
        if username is None:
            err = f'User "{username}" does not exist'

    elif email is not None:
        email = session.query(models.User).filter_by(email=email).first()
        if email is None:
            err = f'User with the email of "{email}" does not exist'

    else:
        err = "User does not exist"
    return err


# Post related helpers
def validate_is_post(session: sa.orm.Session, post_id: int):
    err = None
    post = session.query(models.Post).filter_by(id=post_id).first()
    if post is None:
        err = f"Post id: {post_id} does not exist"
    return err


def validate_post_fields(title: str, caption: str):
    # TODO: Include check for content also once we determine how and what thats going to look like
    err = None
    if not title or title.strip() == "":
        err = "Post title is required"
    elif not caption or caption.strip() == "":
        err = "Post caption is required"
    return err


def validate_post_title(session: sa.orm.Session, title: str):
    err = None
    post = session.query(models.Post).filter_by(title=title).first()
    if post is not None:
        err = f'Post title "{title}" is already in use'
    return err


def verify_post_owner(session: sa.orm.Session, post_id: int, user_id: int):
    err = None
    post = session.query(models.Post).filter_by(id=post_id).first()
    if post.user_id != user_id:
        err = "Can not delete post, only post owners can delete their posts"
    return err


def get_current_user(
    request: Request, session: sa.orm.Session = Depends(get_session)
) -> models.User:
    user_id = request.session.get("user_id")

    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not logged in.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user = session.get(models.User, user_id)

    return user
