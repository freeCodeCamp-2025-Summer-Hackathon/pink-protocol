from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import schemas, crud_users
from .database import get_session

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "ArtHive is buzzing!"}

# Users

@app.get("/users/{user_id}", response_model=schemas.User)
def get_user(user_id: int, session: Session = Depends(get_session)):
    user = crud_users.get_user(session=session, user_id=user_id)
    if user is None:
        raise HTTPException(status_code=404, detail=f"a user with this id does not exist")
    return user

@app.get("/users", response_model=list[schemas.User])
def get_users(skip: int = 0, limit: int = 10, session: Session = Depends(get_session)):
    users = crud_users.get_users(session=session, skip=skip, limit=limit)
    # if users is []: # TODO: determine if we want to raise exception if no users exist, or just return empty list
    #     ...
    return users

@app.post("/users",response_model=schemas.User)
def post_student(user: schemas.UserCreate, session: Session = Depends(get_session)):
    user, err = crud_users.post_user(session=session, user=user)
    if err is not None:
        raise HTTPException(status_code=404, detail=f"unable to add user: {err}")
    return user

@app.delete("/users/{user_id}", response_model=str)
def delete_user(user_id: int, session: Session = Depends(get_session)):
    user_name, user_id, err = crud_users.delete_user(session=session, user_id=user_id)
    if err is not None:
        raise HTTPException(status_code=404, detail=f"error: {err}")
    return f"{user_name} (user_id: {user_id}) has been deleted"