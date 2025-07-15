from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from .. import crud_posts, schemas
from ..database import get_session

# Post-related endpoints
router = APIRouter()

# TODO: add error handling


@router.post("/posts", response_model=schemas.PostResponse)
def post_post(post: schemas.PostCreateCreate, session: Session = Depends(get_session)):
    post = crud_posts.post_post(session=session, post=post)
    return post


@router.put("/posts/{post_id}", response_model=schemas.PostResponse)
def update_post(post_id: int, session: Session = Depends(get_session)):
    post = crud_posts.update_post()
    return post


@router.delete("/posts/{post_id}", response_model=str)
def delete_post(post_id: int, session: Session = Depends(get_session)):
    post_name, post_id, created_by = crud_posts.delete_post(session=session, post_id=post_id)

    return f"{post_name} (post_id: {post_id}) uploaded by {created_by} has been deleted"
