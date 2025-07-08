import re
import sqlalchemy as sa

from . import models

# TODO: Define additional helper functions.
# TODO: Consider creating helper_functions directory so helper functions can be defined cleanly on a per-table level.

def validate_email(session: sa.orm.Session, email: str): # This may not be needed since we use EmailStr typing in pydantic schema
    err = None
    if not validate_email_regex(email):
        err = "invalid email format"

    if not validate_email_unique(session, email):
        err = "a user with this email already exists"

    return err

def validate_email_regex(email): # This may not be needed since we use EmailStr typing in pydantic schema
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'

    if re.match(pattern,email):
        return True
    
    return False

def validate_email_unique(session: sa.orm.Session, email: str):
    # There is an email constraint on the users table, so this may not be necessary 
    statement = sa.select(models.User).where(models.User.email==email)
    if session.scalars(statement).first() is None:
        return True
    return False

def hash_password(password: str): # What return type should the hash be? What libraries should we use? secrets?
    # ...
    return password
    
def validate_password(session: sa.orm.Session, password: str):
    # ...
    return True

def validate_username(session: sa.orm.Session, username: str):
    err = None
    user = session.query(models.User).filter_by(username=username).first()
    if user is not None:
        err = f"Username \"{username}\" is taken"
    return err

def validate_is_user(session: sa.orm.Session, user_id: int):
    err = None
    user = session.query(models.User).filter_by(id=user_id).first()
    if user is None:
        err = f"User {user_id} does not exist"
    return err