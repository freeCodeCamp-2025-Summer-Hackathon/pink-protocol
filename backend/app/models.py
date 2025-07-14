from datetime import datetime

import list
import sqlalchemy as sa
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from backend.app.models import collections_posts_association_table


class Base(sa.orm.DeclarativeBase):
    pass


# TODO: add additional tables (collections, likes, comments)
# TODO: update model attributes based on discussion about initial required params


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    posts: Mapped[list["Post"]] = relationship(
        back_populates="creator", cascade="all, delete-orphan"
    )
    collections_user: Mapped[list["Collection"]] = relationship(
        back_populates="owner", cascade="all, delete-orphan"
    )
    name: Mapped[str] = mapped_column(nullable=False)
    username: Mapped[str] = mapped_column(sa.String, unique=True, nullable=False)
    email: Mapped[str] = mapped_column(sa.String, unique=True, nullable=False)
    created_at: Mapped[datetime] = mapped_column(sa.TIMESTAMP, default=sa.func.now())
    updated_at: Mapped[datetime] = mapped_column(sa.TIMESTAMP, default=sa.func.now())
    # password_hash: Mapped[str] = mapped_column(nullable=False)
    # type: Mapped[str] = mapped_column(nullable=False) # also important for joined table inheritance, not necessary otherwise

    # # This is important for joined table inheritance if we were to support different types of users (user, admin, etc.)
    # __mapper_args__ = {
    #     "polymorphic_identity": "user",
    #     "polymorphic_on": "type",
    #     "with_polymorphic": "*",
    # }

    # For debugging in terminal
    def __repr__(self):
        return f"{self.__class__.__name__}(id={self.id}, name={self.name}, email={self.email}, type={self.type})"


class Post(Base):
    __tablename__ = "posts"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    creator: Mapped["User"] = relationship(back_populates="posts")
    collections_post: Mapped[list["Collection"]] = relationship(
        secondary=collections_posts_association_table, back_populates="posts"
    )
    name: Mapped[str] = mapped_column(nullable=False)
    caption: Mapped[str] = mapped_column(nullable=False)
    created_by: Mapped[int] = mapped_column(sa.ForeignKey("users.id", ondelete="CASCADE"))
    # content # TODO: Figure out how we represent a post's content. If it's a link, it can be stored here. If raw data...

    # For debugging in terminal
    def __repr__(self):
        return f"{self.__class__.__name__}(id={self.id}, name={self.name}, created_by={self.created_by}, caption={self.caption})"


# Check if each collection can be of posts by different users. Might be a functionality to add later.
class Collection(Base):
    __tablename__ = "collections"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    posts: Mapped[list["Post"]] = relationship(
        secondary=collections_posts_association_table, back_populates="collections_post"
    )
    owner: Mapped["User"] = relationship(back_populates="collections_user")
    name: Mapped[str] = mapped_column(nullable=False)
    description: Mapped[str] = mapped_column(
        nullable=False
    )  # Check with team if the description can be null
