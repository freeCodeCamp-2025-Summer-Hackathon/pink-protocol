import datetime
from datetime import timezone
import sqlalchemy as sa
from sqlalchemy.orm import Session
from . import models, schemas
from .helper_functions import *

def post_user(session: Session, user: schemas.UserCreate) -> tuple[models.User, str]:
    # Check if email is properly formatted, unique. May not be necessary (see comments in helper_functions.py)
    err = validate_email(session=session, email=user.email)
    if err is not None:
        return None, err

    user = models.Student(
        name=user.name,
        email=user.email,
        username=user.username,
        password_hash=hash_password(user.password)
    )
    session.add(user)
    session.commit()
    session.refresh(user)
    return user, None

def get_user(session: Session, user_id : int):
    statement = sa.select(models.User).where(models.User.id==user_id)
    return session.scalars(statement).first()

def get_users(session: Session, skip: int = 0, limit: int = 10):
    statement = sa.select(models.User).offset(skip).limit(limit)
    return session.scalars(statement).all()

def update_user(session: Session, user_id: int, user_data: schemas.UserUpdate) -> tuple[models.user, str]:
    user_to_update = session.query(models.user).filter_by(id=user_id).first()
    
    # Check that the user to be updated actually exists
    err = validate_is_user(session=session, user_id=user_id)
    if err is not None:
        return None, err
    
    # If provided, check that email is valid (though this may not be necessary)
    if user_data.email is not None:
        err = validate_email(session=session, email=user_data.email)
        if err is not None:
            return None, err
        
    # If provided, check that username is valid        
    if user_data.username is not None:
        err = validate_username(session=session, username=user_data.username)
        if err is not None:
            return None, err
        
    update_data = user_data.model_dump(exclude_unset=True)
    update_data["updated_at"] = datetime.datetime.now(tz=timezone.utc) # TODO: write this s.t. users table is updated

    # Update the selected record with each key-val pair provided in the request
    for key, val in update_data.items():
        setattr(user_to_update,key,val)
    session.commit()

    # Get updated object
    updated_user = get_user(session=session, user_id=user_id)
    
    # print(f"\n\n\n{updated_user}\n\n\n") 
    return updated_user, None

def delete_user(session: Session, user_id: int):
    err = validate_is_user(session=session, user_id=user_id)
    if err is not None:
        return None, None, err

    statement = sa.delete(models.User).where(models.User.id==user_id).returning(models.User.name, models.User.id)
    result = session.execute(statement)
    session.commit()
    return result.first().name, user_id, err