from passlib.hash import pbkdf2_sha256

from ..app.database import SessionLocal
from ..app.models import Collection, Post, User


DEMO_USERS = [

]

DEMO_POSTS = [

]

DEMO_COLLECTIONS = [

]


def seed_database():
    session = SessionLocal()

    try:
        for user_data in DEMO_USERS:
            pass

        for post_data in DEMO_POSTS:
            pass

        for collection_data in DEMO_COLLECTIONS:
            pass

        session.commit()
        print("Database seeded successfully!")

    except Exception as e:
        session.rollback()
        print(f"Error seeding database: {e}")
    finally:
        session.close()


if __name__ == "__main__":
    seed_database()
