from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .. import crud_users, schemas
from ..database import get_session

# User-related endpoints
router = APIRouter()


@router.get("/users/{user_id}", response_model=schemas.UserResponse)
def get_user(user_id: int, session: Session = Depends(get_session)):
    user = crud_users.get_user(session=session, user_id=user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="a user with this id does not exist")
    return user


@router.get("/users", response_model=list[schemas.UserResponse])
def get_users(skip: int = 0, limit: int = 10, session: Session = Depends(get_session)):
    users = crud_users.get_users(session=session, skip=skip, limit=limit)
    if users is []: # TODO: determine if we want to raise exception if no users exist, or just return empty list
        raise HTTPException(status_code=204, detail=f"no users yet!")
    return users


@router.post("/users", response_model=schemas.UserResponse)
def post_user(user: schemas.UserCreate, session: Session = Depends(get_session)):
    user, err = crud_users.post_user(session=session, user=user)
    if err is not None:
        raise HTTPException(status_code=404, detail=f"unable to add user: {err}")
    return user


@router.put("/users/{user_id}", response_model=schemas.UserResponse)
def update_user(
    user_id: int, user_data: schemas.UserUpdate, session: Session = Depends(get_session)
):
    user, err = crud_users.update_user(session=session, user_id=user_id, user_data=user_data)
    if err is not None:
        raise HTTPException(status_code=404, detail=f"error: {err}")
    return user


@router.delete("/users/{user_id}", response_model=str)
def delete_user(user_id: int, session: Session = Depends(get_session)):
    user_name, user_id, err = crud_users.delete_user(session=session, user_id=user_id)
    if err is not None:
        raise HTTPException(status_code=404, detail=f"error: {err}")
    return f"{user_name} (user_id: {user_id}) has been deleted"
