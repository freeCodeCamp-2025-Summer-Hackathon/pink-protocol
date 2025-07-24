from datetime import datetime

import sqlalchemy as sa
from sqlalchemy import Column, ForeignKey, Table
from sqlalchemy.orm import Mapped, mapped_column, relationship


class Base(sa.orm.DeclarativeBase):
    pass


collections_posts_association_table = Table(
    "association_table",
    Base.metadata,
    Column("posts", ForeignKey("posts.id"), primary_key=True),
    Column("collections", ForeignKey("collections.id"), primary_key=True),
)


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(nullable=False)
    username: Mapped[str] = mapped_column(sa.String, unique=True, nullable=False)
    email: Mapped[str] = mapped_column(sa.String, unique=True, nullable=False)
    created_at: Mapped[datetime] = mapped_column(sa.TIMESTAMP, default=sa.func.now())
    updated_at: Mapped[datetime] = mapped_column(sa.TIMESTAMP, default=sa.func.now())
    password_hash: Mapped[str] = mapped_column(nullable=False, default="empty")

    posts: Mapped[list["Post"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    collections: Mapped[list["Collection"]] = relationship(
        back_populates="user", cascade="all, delete-orphan"
    )  # Why not just "collections?"
    likes: Mapped[list["Like"]] = relationship(back_populates="user", foreign_keys="Like.user_id")
    comments: Mapped[list["Comment"]] = relationship(
        back_populates="user", foreign_keys="Comment.user_id"
    )

    # For debugging in terminal
    def __repr__(self):
        return f"{self.__class__.__name__}(id={self.id}, name={self.name}, email={self.email}, type={self.type})"


class Post(Base):
    __tablename__ = "posts"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(nullable=False)
    caption: Mapped[str] = mapped_column(nullable=False, default="empty")
    img_url: Mapped[str] = mapped_column(nullable=False, default="empty")
    published: Mapped[bool] = mapped_column(nullable=False, default=False)
    created_at: Mapped[datetime] = mapped_column(sa.TIMESTAMP, default=sa.func.now())
    updated_at: Mapped[datetime] = mapped_column(sa.TIMESTAMP, default=sa.func.now())
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    user: Mapped["User"] = relationship(back_populates="posts")
    collections: Mapped[list["Collection"]] = relationship(
        secondary=collections_posts_association_table, back_populates="posts"
    )
    likes: Mapped[list["Like"]] = relationship(back_populates="post")
    comments: Mapped[list["Comment"]] = relationship(back_populates="post")

    # For debugging in terminal
    def __repr__(self):
        return f"{self.__class__.__name__}(id={self.id}, title={self.title}, created_by={self.user_id}, caption={self.caption})"


# Check if each collection can be of posts by different users. Might be a functionality to add later.
class Collection(Base):
    __tablename__ = "collections"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    posts: Mapped[list["Post"]] = relationship(
        secondary=collections_posts_association_table, back_populates="collections"
    )
    user: Mapped["User"] = relationship(back_populates="collections")
    name: Mapped[str] = mapped_column(nullable=False)
    description: Mapped[str] = mapped_column(nullable=False)
    private: Mapped[bool] = mapped_column(default=False)
    created_at: Mapped[datetime] = mapped_column(sa.TIMESTAMP, default=sa.func.now())
    updated_at: Mapped[datetime] = mapped_column(sa.TIMESTAMP, default=sa.func.now())

    def __repr__(self):
        return f"{self.__class__.__name__}(id={self.id}, name={self.name}, owner={self.owner}, description={self.description}, private={self.private})"


class Interaction(Base):
    __tablename__ = "interactions"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    post_id: Mapped[int] = mapped_column(ForeignKey("posts.id"), nullable=False)
    type: Mapped[str] = mapped_column(nullable=False)

    # # This is important for joined table inheritance if we were to support different types of users (user, admin, etc.)
    __mapper_args__ = {
        "polymorphic_identity": "interaction",
        "polymorphic_on": "type",
        "with_polymorphic": "*",
    }

    # For debugging in terminal
    def __repr__(self):
        return f"{self.__class__.__name__}(id={self.id}, user_id={self.user_id}, post_id={self.post_id})"


class Like(Interaction):
    __tablename__ = "likes"

    id = mapped_column(sa.ForeignKey("interactions.id", ondelete="CASCADE"), primary_key=True)
    user: Mapped["User"] = relationship(back_populates="likes")
    post: Mapped["Post"] = relationship(back_populates="likes")

    __mapper_args__ = {
        "polymorphic_identity": "like",
        "inherit_condition": id == Interaction.id,
    }

    def __repr__(self):
        return f"{self.__class__.__name__}(id={self.id}, user_id={self.user_id}, post_id={self.post_id})"


class Comment(Interaction):
    __tablename__ = "comments"

    id = mapped_column(sa.ForeignKey("interactions.id", ondelete="CASCADE"), primary_key=True)
    user: Mapped["User"] = relationship(back_populates="comments")
    post: Mapped["Post"] = relationship(back_populates="comments")
    content = mapped_column(sa.String, nullable=False)

    __mapper_args__ = {
        "polymorphic_identity": "comment",
        "inherit_condition": id == Interaction.id,
    }

    def __repr__(self):
        return f"{self.__class__.__name__}(id={self.id}, user_id={self.user_id}, post_id={self.post_id}, content={self.content})"
