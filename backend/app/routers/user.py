from fastapi import APIRouter, Depends, HTTPException, status, Response
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from ..auth import create_access_token, verify_token
from sqlalchemy.orm import Session

from .. import crud_users, schemas
from ..database import get_session

# User-related endpoints
router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/users/login")


@router.get("/users/{user_id}", response_model=schemas.UserResponse)
def get_user(
    user_id: int,
    session: Session = Depends(get_session),
):
    user = crud_users.get_user(session=session, user_id=user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="a user with this id does not exist")
    return user


@router.get("/users", response_model=list[schemas.UserResponse])
def get_users(
    skip: int = 0,
    limit: int = 10,
    session: Session = Depends(get_session),
):
    return crud_users.get_users(session=session, skip=skip, limit=limit)


@router.post(
    "/users",
    response_model=schemas.UserResponse,
    status_code=status.HTTP_201_CREATED,
)
def post_user(
    user: schemas.UserCreate,
    session: Session = Depends(get_session),
):
    user, err = crud_users.post_user(session=session, user=user)
    if err:
        raise HTTPException(status_code=409, detail=f"unable to add user: {err}")
    return user


@router.post("/users/login")
def login_user(
    form: OAuth2PasswordRequestForm = Depends(),
    session: Session = Depends(get_session),
):
    user, err = crud_users.login_user(
        session=session, email=form.username, password=form.password
    )
    if err:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=err)

    token = create_access_token({"sub": str(user.id)})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": user
    }


def get_current_user(
    token: str = Depends(oauth2_scheme),
    session: Session = Depends(get_session),
):
    payload = verify_token(token)
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="invalid token")

    user = crud_users.get_user(session=session, user_id=int(payload["sub"]))
    if user is None:
        raise HTTPException(status_code=404, detail="user not found")
    return user


@router.put("/users/{user_id}", response_model=schemas.UserResponse)
def update_user(
    user_id: int,
    user_data: schemas.UserUpdate,
    session: Session = Depends(get_session),
):
    user, err = crud_users.update_user(session=session, user_id=user_id, user_data=user_data)
    if err:
        err_lower = err.lower()
        if any(k in err_lower for k in ("incorrect", "already exists", "is taken")):
            raise HTTPException(status_code=409, detail=f"error: {err}")
        if "does not exist" in err_lower:
            raise HTTPException(status_code=404, detail=f"error: {err}")
    return user


@router.delete("/users/{user_id}", response_model=str)
def delete_user(
    user_id: int,
    session: Session = Depends(get_session),
):
    user_name, user_id, err = crud_users.delete_user(session=session, user_id=user_id)
    if err:
        raise HTTPException(status_code=404, detail=f"error: {err}")
    return f"{user_name} (user_id: {user_id}) has been deleted"
