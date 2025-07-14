from datetime import datetime

import ForeignKey
import list
import sqlalchemy as sa
from sqlalchemy.orm import Mapped, mapped_column, relationship


class Base(sa.orm.DeclarativeBase):
    pass


# TODO: add additional tables (collections, likes, comments)
# TODO: update model attributes based on discussion about initial required params


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    posts: Mapped[list["Post"]] = relationship("Posts", cascade="all, delete")
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
    name: Mapped[str] = mapped_column(nullable=False)
    caption: Mapped[str] = mapped_column(nullable=False)
    created_by: Mapped[int] = mapped_column(sa.ForeignKey("users.id", ondelete="CASCADE"))
    # content # TODO: Figure out how we represent a post's content. If it's a link, it can be stored here. If raw data...

    # For debugging in terminal
    def __repr__(self):
        return f"{self.__class__.__name__}(id={self.id}, name={self.name}, created_by={self.created_by}, caption={self.caption})"


# Check if each collection can be of posts by different users. Might be a functionality to add later.
class Collection(Base):
    __tablename__ = "colletions"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    name: Mapped[str] = mapped_column(nullable=False)
    description: Mapped[str] = mapped_column(
        nullable=False
    )  # Check with team if the description can be null
