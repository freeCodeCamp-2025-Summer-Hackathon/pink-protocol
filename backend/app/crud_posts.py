import datetime
from datetime import timezone

import sqlalchemy as sa
from sqlalchemy.orm import Session

from . import models, schemas

# TODO: add in error handling


def get_post(session: Session, post_id: int):
    statement = sa.select(models.Post).where(models.Post.id == post_id)
    return session.scalars(statement).first()


def post_post(session: Session, post: schemas.PostCreate):
    post = models.Post(
        name=post.name,
        caption=post.caption,
        # content=post.content,
        created_by=post.created_by,
    )
    session.add(post)
    session.commit()
    session.refresh(post)
    return post


def update_post(session: Session, post_id: int, post_data: schemas.PostUpdate):
    post_to_update = session.query(models.Post).filter_by(id=post_id).first()
    update_data = post_data.model_dump(exclude_unset=True)
    update_data["updated_at"] = datetime.datetime.now(tz=timezone.utc)

    for key, val in update_data.items():
        setattr(post_to_update, key, val)
    session.commit()

    updated_post = get_post(session=session, post_id=post_id)
    return updated_post


def delete_post(session: Session, post_id: int):
    statement = (
        sa.delete(models.Post)
        .where(models.Post.id == post_id)
        .returning(models.Post.name, models.Post.created_by)
    )
    result = session.execute(statement)
    session.commit()

    deleted_post = result.first()
    if deleted_post:
        return deleted_post.name, post_id, deleted_post.created_by
    else:
        return None, post_id, None
