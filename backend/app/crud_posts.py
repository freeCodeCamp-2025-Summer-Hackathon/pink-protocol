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


def post_post(
    session: Session,
    # post: schemas.PostCreate,
    user_id: int,
    title: str,
    caption: str,
    published: bool,
    img_url: str,
):
    err = validate_post_fields(title, caption)
    err = validate_post_title(session=session, title=title)
    if err is not None:
        return None, err

    db_post = models.Post(
        title=title,
        caption=caption,
        published=published,
        img_url=img_url,
        # img_delete_url=post.img_delete_url
        user_id=user_id,
    )
    session.add(db_post)
    session.commit()
    session.refresh(db_post)
    return db_post, None


def update_post(session: Session, post_id: int, post_data: schemas.PostUpdate, user_id: int):
    post_to_update = session.query(models.Post).filter_by(id=post_id).first()
    err = validate_is_post(session=session, post_id=post_id)
    if err is not None:
        return None, err

    # TODO: check if post belongs to user

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
        .returning(models.Post.title, models.Post.user_id)
    )
    result = session.execute(statement)
    session.commit()

    deleted_post = result.first()
    return deleted_post.title, post_id, deleted_post.user_id
