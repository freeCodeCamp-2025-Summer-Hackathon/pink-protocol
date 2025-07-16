from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr


# User related schemas
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    username: str
    # password: str


class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    username: Optional[str] = None
    # password: Optional[str] = None


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    username: str
    created_at: datetime

    class Config:
        from_attributes = True


# Post related schemas
class PostBase(BaseModel):
    title: str
    # content: {type}
    description: str | None = None
    published: bool = True


class PostCreate(PostBase):
    pass


class PostUpdate(PostBase):
    title: Optional[str] = None
    # content: Optional[type] = None
    description: Optional[str] = None
    published: Optional[bool] = None


class PostResponse(PostBase):
    id: int
    artist_id: int
    artist: UserResponse
    like_count: int  # to be computed from Like table
    created_at: datetime

    class Config:
        from_attributes = True


# Interaction related schemas
# figured we could stick with a simple "like/unlike" interface for now
class Like(BaseModel):
    id: int
    user_id: int
    post_id: int
    created_at: datetime


# Collection related schemas
class CollectionBase(BaseModel):
    user_id: int
    posts: Optional[list[PostBase]] = None
    owner: str
    name: str
    # keeping this as required for now to match Alfredo's Collection model
    description: str


class CollectionCreate(CollectionBase):
    pass


class CollectionUpdate(BaseModel):
    posts: Optional[list[PostBase]] = None
    name: Optional[str] = None
    description: Optional[str] = None


class CollectionResponse(CollectionBase):
    id: int
    name: str
    owner: str
    posts: Optional[list[PostBase]]
