from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr


# User related schemas
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    username: str
    password: str


class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    username: Optional[str] = None
    password: Optional[str] = None


class UserLogin(BaseModel):
    email: Optional[EmailStr] = None
    username: Optional[str] = None
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
    caption: Optional[str] = None


class PostCreate(PostBase):
    pass


class PostUpdate(PostBase):
    title: Optional[str] = None
    # content: Optional[type] = None
    caption: Optional[str] = None


class PostResponse(PostBase):
    id: int
    title: str
    caption: Optional[str] = None
    created_at: datetime
    user_id: int
    # comments : list[Comment]
    # like_count: int  # to be computed from Like table

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
