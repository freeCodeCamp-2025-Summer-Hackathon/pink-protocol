# scripts/seed.py
import os
import sys

sys.path.append(os.path.join(os.path.dirname(__file__), ".."))

from passlib.hash import pbkdf2_sha256

from app.database import SessionLocal
from app.models import Collection, Post, User

# TODO: create pink-protocol ImgBB account & API key -> poste img urls in place


DEMO_USERS = [
    {
        "name": "",
        "username": "",
        "email": "",
        "password": "",
        "posts": [
            {
                "title": "",
                "caption": "",
                "published": "",
                "img_url": "",
            },
        ],
        "collections": [
            {
                "name": "",
                "description": "",
                "post_titles": [""],
            },
        ],
    },
]


def seed_database():
    session = SessionLocal()

    try:
        for user_data in DEMO_USERS:
            user = User(
                name=user_data["name"],
                email=user_data["email"],
                username=user_data["username"],
                password_hash=pbkdf2_sha256.hash(user_data["password"]),
            )
            session.add(user)
            session.commit()
            session.refresh(user)

            user_posts = {}
            for post_data in user_data["posts"]:
                post = Post(
                    user=user,
                    title=post_data["title"],
                    caption=post_data["caption"],
                    published=post_data["published"],
                    img_url=post_data["img_url"],
                )
                session.add(post)
                session.commit()
                session.refresh(post)
                user_posts[post.title] = post

            for collection_data in user_data["collections"]:
                collection_posts = [
                    user_posts[title]
                    for title in collection_data["post_titles"]
                    if title in user_posts
                ]

                collection = Collection(
                    name=collection_data["name"],
                    description=collection_data.get("description", ""),
                    user=user,
                    posts=collection_posts,
                )
                session.add(collection)
                session.commit()
                session.refresh(collection)

        print("Database seeded successfully!")

    except Exception as e:
        session.rollback()
        print(f"Error seeding database: {e}")
    finally:
        session.close()


if __name__ == "__main__":
    seed_database()
