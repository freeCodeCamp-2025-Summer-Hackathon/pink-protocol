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
    # password: Optional[str] = None


class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    username: str
    created_at: datetime

    class Config:
        from_attributes = True


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse


# Post related schemas
class PostBase(BaseModel):
    title: str
    caption: Optional[str] = None
    published: bool = False
    img_url: str
    # img_delete_hash: str


class PostCreate(PostBase):
    pass


class PostUpdate(PostBase):
    title: Optional[str] = None
    # content: Optional[type] = None
    caption: Optional[str] = None


class PostResponse(PostBase):
    id: int
    title: str
    caption: str
    created_at: datetime
    user_id: int
    img_url: str

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
    # posts: Optional[list[int]] = None
    # user: str # is this necessary? we have the user_id
    name: str
    # keeping this as required for now to match Alfredo's Collection model
    description: Optional[str] = None


class CollectionCreate(CollectionBase):
    pass


class CollectionUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None


class CollectionAddPost(BaseModel):
    posts: list[int]


class CollectionResponse(CollectionBase):
    id: int
    name: str
    description: str
    user_id: int
    posts: list[PostResponse]
