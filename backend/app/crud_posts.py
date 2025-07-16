import datetime
from datetime import timezone

import sqlalchemy as sa
from sqlalchemy.orm import Session

from . import models, schemas
from .helper_functions import *


def get_post(session: Session, post_id: int):
    statement = sa.select(models.Post).where(models.Post.id == post_id)
    return session.scalars(statement).first()


def get_posts(session: Session, skip: int = 0, limit: int = 10):
    statement = sa.select(models.Post).offset(skip).limit(limit)
    return session.scalars(statement).all()


def post_post(session: Session, post: schemas.PostCreate) -> tuple[models.User, str]:
    err = validate_post_fields(post.name, post.caption)
    err = validate_post_name(session=session, name=post.name)
    if err is not None:
        return None, err

    post = models.Post(
        name=post.name,
        caption=post.caption,
        # content=post.content,
        created_by=post.created_by,
    )
    session.add(post)
    session.commit()
    session.refresh(post)
    return post, None


def update_post(session: Session, post_id: int, post_data: schemas.PostUpdate):
    post_to_update = session.query(models.Post).filter_by(id=post_id).first()
    err = validate_is_post(session=session, post_id=post_id)
    if err is not None:
        return None, err

    update_data = post_data.model_dump(exclude_unset=True)
    update_data["updated_at"] = datetime.datetime.now(tz=timezone.utc)

    for key, val in update_data.items():
        setattr(post_to_update, key, val)
    session.commit()

    updated_post = get_post(session=session, post_id=post_id)
    return updated_post


def delete_post(session: Session, post_id: int):
    err = validate_is_post(session=session, post_id=post_id)
    if err is not None:
        return None, None, None, err

    statement = (
        sa.delete(models.Post)
        .where(models.Post.id == post_id)
        .returning(models.Post.name, models.Post.created_by)
    )
    result = session.execute(statement)
    session.commit()

    deleted_post = result.first()
    return deleted_post.name, post_id, deleted_post.created_by
