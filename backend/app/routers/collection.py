from typing import Annotated

from fastapi import APIRouter, Depends, Header, HTTPException, status
from sqlalchemy.orm import Session

from .. import crud_collections, schemas
from ..database import get_session

# Collection-related endpoints
router = APIRouter()


@router.get("/collections/{collection_id}", response_model=schemas.CollectionResponse)
def get_collection(
    collection_id: int,
    session: Session = Depends(get_session),
):
    collection = crud_collections.get_collection(session=session, collection_id=collection_id)
    if collection is None:
        raise HTTPException(status_code=404, detail="a collection with this id does not exist")
    return collection


@router.get("/collections", response_model=list[schemas.CollectionResponse])
def get_collections(
    skip: int = 0,
    limit: int = 10,
    session: Session = Depends(get_session),
):
    return crud_collections.get_collections(session=session, skip=skip, limit=limit)


@router.post(
    "/collections",
    response_model=schemas.CollectionResponse,
    status_code=status.HTTP_201_CREATED,
)
def post_collection(
    collection: schemas.CollectionCreate,
    user_id: Annotated[int | None, Header()],
    session: Session = Depends(get_session),
):
    collection, err = crud_collections.post_collection(
        session=session, collection=collection, user_id=user_id
    )
    if err:
        raise HTTPException(status_code=409, detail=f"unable to add collection: {err}")
    return collection


@router.put("/collections/{collection_id}", response_model=schemas.CollectionResponse)
def update_collection(
    collection_id: int,
    collection_data: schemas.CollectionUpdate,
    user_id: Annotated[int | None, Header()],
    session: Session = Depends(get_session),
):
    collection, err = crud_collections.update_collection(
        session=session,
        collection_id=collection_id,
        collection_data=collection_data,
        user_id=user_id,
    )
    if err:
        raise HTTPException(
            status_code=404, detail=f"error: {err}"
        )  # TODO: update error handling behavior
    return collection


@router.put("/collections/{collection_id}/posts", response_model=schemas.CollectionResponse)
def add_posts_to_collection(
    collection_id: int,
    collection_data: schemas.CollectionAddPost,
    user_id: Annotated[int | None, Header()],
    session: Session = Depends(get_session),
):
    collection, err = crud_collections.add_posts_to_collection(
        session=session,
        collection_id=collection_id,
        collection_data=collection_data,
        user_id=user_id,
    )
    if err:
        raise HTTPException(
            status_code=404, detail=f"error: {err}"
        )  # TODO: update error handling behavior
    return collection


@router.delete("/collections/{collection_id}", response_model=str)
def delete_collection(
    collection_id: int,
    session: Session = Depends(get_session),
):
    collection_name, collection_id, err = crud_collections.delete_collection(
        session=session, collection_id=collection_id
    )
    if err:
        raise HTTPException(status_code=404, detail=f"error: {err}")
    return f"{collection_name} (collection_id: {collection_id}) has been deleted"
