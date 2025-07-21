from typing import Annotated

from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy.orm import Session

from .. import crud_posts, schemas
from ..database import get_session

# Post-related endpoints
router = APIRouter()


# Do we handle likes in a separate table with post_id & user_id foreign keys? YES
# Then have separate endpoints for posting & deleting likes like:
# POST /posts/{id}/like
# DELETE /posts/{id}/like
# GET /posts/{id} # returns PostResponse with computed like_count


@router.get("/posts/{post_id}", response_model=schemas.PostResponse)
def get_post(
    post_id: int,
    session: Session = Depends(get_session),
):
    post = crud_posts.get_post(session=session, post_id=post_id)
    if post is None:
        raise HTTPException(status_code=404, detail="a post with this id does not exist")
    return post


@router.get("/posts", response_model=list[schemas.PostResponse])
def get_posts(
    skip: int = 0,
    limit: int = 10,
    session: Session = Depends(get_session),
):
    posts = crud_posts.get_posts(session=session, skip=skip, limit=limit)
    if posts == []:
        raise HTTPException(status_code=204, detail="no posts yet!")
    return posts


@router.post("/posts", response_model=schemas.PostResponse)
def post_post(
    post: schemas.PostCreate,
    user_id: Annotated[int | None, Header()],
    session: Session = Depends(get_session),
):
    post, err = crud_posts.post_post(session=session, post=post, user_id=user_id)
    if err is not None:
        raise HTTPException(status_code=404, detail=f"unable to add post: {err}")
    return post


@router.put("/posts/{post_id}", response_model=schemas.PostResponse)
def update_post(
    post_id: int,
    post_data: schemas.PostUpdate,
    user_id: Annotated[int | None, Header()],
    session: Session = Depends(get_session),
):
    post, err = crud_posts.update_post(
        post_id=post_id,
        post_data=post_data,
        session=session,
        user_id=user_id,
    )
    if err is not None:
        raise HTTPException(status_code=404, detail=f"unable to update post: {err}")
    return post


@router.delete("/posts/{post_id}", response_model=str)
def delete_post(
    post_id: int,
    user_id: Annotated[int | None, Header()],
    session: Session = Depends(get_session),
):
    post_name, post_id, created_by, err = crud_posts.delete_post(
        session=session,
        post_id=post_id,
        user_id=user_id,
    )
    if err is not None:
        raise HTTPException(status_code=404, detail=f"error: {err}")

    return f"{post_name} (post_id: {post_id}) uploaded by (user id: {created_by}) has been deleted"
