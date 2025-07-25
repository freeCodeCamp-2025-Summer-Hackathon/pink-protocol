import datetime
from datetime import timezone

import sqlalchemy as sa
from sqlalchemy.orm import Session

from . import crud_posts, models, schemas
from .helper_functions import *


def post_collection(session: Session, collection: schemas.CollectionCreate, user_id: int):
    # TODO: assign initial post, or posts, to a collection. For now, can be left as none

    collection = models.Collection(
        name=collection.name,
        # posts=[], # This may not work
        user_id=user_id,
        # user="Placeholder String", #TODO: get name of user from user_id
        description=collection.description,
    )
    session.add(collection)
    session.commit()
    session.refresh(collection)
    return collection, None


def get_collection(session: Session, collection_id: int):
    statement = sa.select(models.Collection).where(models.Collection.id == collection_id)
    return session.scalars(statement).first()


def get_collections(session: Session, skip: int = 0, limit: int = 10):
    statement = sa.select(models.Collection).offset(skip).limit(limit)
    return session.scalars(statement).all()


def update_collection(
    session: Session, collection_id: int, collection_data: schemas.CollectionUpdate, user_id: int
):
    # Check that the collection to be updated actually exists
    err = validate_is_collection(session=session, collection_id=collection_id)
    if err is not None:
        return None, err

    # Check that user owns collection
    err = verify_collection_user(session=session, collection_id=collection_id, user_id=user_id)
    if err is not None:
        return None, err

    collection_to_update = session.query(models.Collection).filter_by(id=collection_id).first()

    update_data = collection_data.model_dump(exclude_unset=True)
    update_data["updated_at"] = datetime.datetime.now(tz=timezone.utc)

    # Update the selected record with each key-val pair provided in the request
    for key, val in update_data.items():
        setattr(collection_to_update, key, val)
    session.commit()

    # Get updated object
    updated_collection = get_collection(session=session, collection_id=collection_id)

    # print(f"\n\n\n{updated_collection}\n\n\n")
    return updated_collection, None


def add_posts_to_collection(
    session: Session, collection_id: int, collection_data: schemas.CollectionAddPost, user_id: int
):
    # Check that the collection to be updated actually exists
    err = validate_is_collection(session=session, collection_id=collection_id)
    if err is not None:
        return None, err

    # Check that user owns collection
    err = verify_collection_user(session=session, collection_id=collection_id, user_id=user_id)
    if err is not None:
        return None, err

    # Check that each post ID is actually a post
    for post_id in collection_data.posts:
        err = validate_is_post(session=session, post_id=post_id)
        if err is not None:
            return None, err

    collection_to_update = session.query(models.Collection).filter_by(id=collection_id).first()
    posts_to_collections = (
        session.query(models.collections_posts_association_table)
        .filter_by(collections=collection_id)
        .all()
    )

    # get sets of posts to be added and subtracted
    posts_in_collection = set(map(lambda x: x[0], posts_to_collections))
    posts_from_request = set(collection_data.posts)
    posts_to_be_added = posts_from_request.difference(posts_in_collection)

    # # does the same as the for loop below
    post_list = map(
        lambda session, id: crud_posts.get_post(session=session, post_id=id),
        session,
        posts_to_be_added,
    )

    # post_list = []

    # for post_id in posts_to_be_added:
    #     post = crud_posts.get_post(session=session, post_id=post_id)
    #     post_list.append(post) #use case for `map()`

    collection_to_update.posts.extend(post_list)
    collection_to_update.updated_at = datetime.datetime.now(tz=timezone.utc)

    session.commit()

    # Get updated object
    updated_collection = get_collection(session=session, collection_id=collection_id)

    # print(f"\n\n\n{updated_collection}\n\n\n")
    return updated_collection, None


def delete_collection(session: Session, collection_id: int):
    err = validate_is_collection(session=session, collection_id=collection_id)
    if err is not None:
        return None, None, err

    statement = (
        sa.delete(models.Collection)
        .where(models.Collection.id == collection_id)
        .returning(models.Collection.name, models.Collection.id)
    )
    result = session.execute(statement)
    session.commit()
    return result.first().name, collection_id, err
