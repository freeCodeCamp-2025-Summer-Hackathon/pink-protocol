from datetime import datetime
from pydantic import BaseModel, EmailStr


# User related schemas
class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserUpdate(BaseModel):
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    created_at: datetime


# Post related schemas
class PostBase(BaseModel):
    title: str
    description: str | None = None
    published: bool = True

class PostCreate(PostBase):
    pass

class PostResponse(PostBase):
    id: int
    artist_id: int
    artist: UserResponse
    created_at: datetime