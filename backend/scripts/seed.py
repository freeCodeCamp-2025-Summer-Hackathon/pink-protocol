import os
import sys

sys.path.append(os.path.join(os.path.dirname(__file__), ".."))

from passlib.hash import pbkdf2_sha256

from app.database import SessionLocal
from app.models import Collection, Post, User

DEMO_USERS = [
    {
        "name": "Alex Johnson",
        "username": "alexj",
        "email": "alex.johnson@example.com",
        "password": "AbCd1234#",
        "posts": [
            {
                "title": "Morning Coffee Ritual",
                "caption": "Starting the day right with a perfect cup of coffee",
                "published": True,
                "img_url": "https://i.ibb.co/hFs5P4JR/8-1080x810.jpg",
            },
            {
                "title": "Weekend Hiking Adventure",
                "caption": "Exploring mountain trails and enjoying nature",
                "published": True,
                "img_url": "https://i.ibb.co/1JmHH83C/120-810x1080.jpg",
            },
            {
                "title": "Homemade Pizza Night",
                "caption": "Tried making pizza from scratch - turned out amazing!",
                "published": False,
                "img_url": "https://i.ibb.co/qL43dNSh/124-1080x1080.jpg",
            },
            {
                "title": "Book Review: Tech Trends",
                "caption": "Thoughts on the latest technology book I read",
                "published": True,
                "img_url": "https://i.ibb.co/kVSNmmKG/145-1080x1080.jpg",
            },
            {
                "title": "City Sunset Views",
                "caption": "Captured this beautiful sunset from my apartment",
                "published": True,
                "img_url": "https://i.ibb.co/3qxhF6Q/294-810x1080.jpg",
            },
        ],
        "collections": [
            {
                "name": "Daily Life",
                "description": "Moments from my everyday routine",
                "post_titles": [
                    "Morning Coffee Ritual",
                    "Homemade Pizza Night",
                    "City Sunset Views",
                    "Weekend Hiking Adventure",
                ],
            },
            {
                "name": "Outdoor Adventures",
                "description": "My hiking and nature experiences",
                "post_titles": [
                    "Weekend Hiking Adventure",
                    "City Sunset Views",
                    "Morning Coffee Ritual",
                    "Book Review: Tech Trends",
                ],
            },
            {
                "name": "Creative Projects",
                "description": "Things I've made and created",
                "post_titles": [
                    "Homemade Pizza Night",
                    "Book Review: Tech Trends",
                    "City Sunset Views",
                    "Morning Coffee Ritual",
                ],
            },
        ],
    },
    {
        "name": "Sarah Chen",
        "username": "sarahc",
        "email": "sarah.chen@example.com",
        "password": "AbCd1234#",
        "posts": [
            {
                "title": "Photography Workshop",
                "caption": "Learning new techniques for portrait photography",
                "published": True,
                "img_url": "https://i.ibb.co/pSF9KWW/168-1080x810.jpg",
            },
            {
                "title": "Garden Progress Update",
                "caption": "My tomatoes are finally starting to grow!",
                "published": True,
                "img_url": "https://i.ibb.co/1fGVmgBg/260-810x1080.jpg",
            },
            {
                "title": "Yoga Morning Routine",
                "caption": "Finding peace through morning yoga practice",
                "published": True,
                "img_url": "https://i.ibb.co/gZdqRHVw/175-810x1080.jpg",
            },
            {
                "title": "Art Museum Visit",
                "caption": "Incredible modern art exhibition downtown",
                "published": False,
                "img_url": "https://i.ibb.co/NnF8KGqR/198-810x1080.jpg",
            },
            {
                "title": "Healthy Smoothie Recipe",
                "caption": "My go-to green smoothie for busy mornings",
                "published": True,
                "img_url": "https://i.ibb.co/KxW9V1K8/238-1080x810.jpg",
            },
        ],
        "collections": [
            {
                "name": "Wellness Journey",
                "description": "Health and mindfulness practices",
                "post_titles": [
                    "Yoga Morning Routine",
                    "Healthy Smoothie Recipe",
                    "Garden Progress Update",
                    "Photography Workshop",
                ],
            },
            {
                "name": "Creative Arts",
                "description": "Photography and artistic endeavors",
                "post_titles": [
                    "Photography Workshop",
                    "Art Museum Visit",
                    "Garden Progress Update",
                    "Yoga Morning Routine",
                ],
            },
            {
                "name": "Home & Garden",
                "description": "Projects around the house and garden",
                "post_titles": [
                    "Garden Progress Update",
                    "Healthy Smoothie Recipe",
                    "Yoga Morning Routine",
                    "Art Museum Visit",
                ],
            },
        ],
    },
    {
        "name": "Michael Torres",
        "username": "miket",
        "email": "michael.torres@example.com",
        "password": "AbCd1234#",
        "posts": [
            {
                "title": "New Gaming Setup",
                "caption": "Finally upgraded my gaming rig with RGB lighting",
                "published": True,
                "img_url": "https://i.ibb.co/9kTftcMt/310-1080x810.jpg",
            },
            {
                "title": "Cooking Experiment",
                "caption": "Tried making ramen from scratch - it was challenging!",
                "published": True,
                "img_url": "https://i.ibb.co/Hf9hwkmv/404-1080x810.jpg",
            },
            {
                "title": "Beach Day Memories",
                "caption": "Perfect weather for a day at the coast",
                "published": True,
                "img_url": "https://i.ibb.co/8gPdK5KX/436-1080x1080.jpg",
            },
            {
                "title": "Code Project Update",
                "caption": "Making progress on my web development portfolio",
                "published": False,
                "img_url": "https://i.ibb.co/V0hWV3WF/514-810x1080.jpg",
            },
            {
                "title": "Concert Night Out",
                "caption": "Amazing live music performance downtown",
                "published": True,
                "img_url": "https://i.ibb.co/k632YGS3/515-1080x810.jpg",
            },
        ],
        "collections": [
            {
                "name": "Tech & Gaming",
                "description": "Gaming setups and tech projects",
                "post_titles": [
                    "New Gaming Setup",
                    "Code Project Update",
                    "Concert Night Out",
                    "Cooking Experiment",
                ],
            },
            {
                "name": "Weekend Adventures",
                "description": "Fun activities and outings",
                "post_titles": [
                    "Beach Day Memories",
                    "Concert Night Out",
                    "Cooking Experiment",
                    "New Gaming Setup",
                ],
            },
            {
                "name": "Learning Projects",
                "description": "New skills and experiments",
                "post_titles": [
                    "Code Project Update",
                    "Cooking Experiment",
                    "New Gaming Setup",
                    "Beach Day Memories",
                ],
            },
        ],
    },
    {
        "name": "Emma Rodriguez",
        "username": "emmar",
        "email": "emma.rodriguez@example.com",
        "password": "AbCd1234#",
        "posts": [
            {
                "title": "Marathon Training Week 8",
                "caption": "Long run completed - feeling stronger every week",
                "published": True,
                "img_url": "https://i.ibb.co/KC1vrsH/543-810x1080.jpg",
            },
            {
                "title": "Baking Sourdough Bread",
                "caption": "My starter is finally ready for the perfect loaf",
                "published": True,
                "img_url": "https://i.ibb.co/8D3ssfmR/810-1080x1080.jpg",
            },
            {
                "title": "Dog Park Adventures",
                "caption": "Max made so many new friends today",
                "published": True,
                "img_url": "https://i.ibb.co/DfZfJgwK/820-1080x810.jpg",
            },
            {
                "title": "Interior Design Ideas",
                "caption": "Redecorating the living room with plants and art",
                "published": False,
                "img_url": "https://i.ibb.co/HJV9rPF/853-1080x1080.jpg",
            },
            {
                "title": "Farmers Market Haul",
                "caption": "Fresh vegetables and local honey for the week",
                "published": True,
                "img_url": "https://i.ibb.co/J1cqbdt/863-1080x1080.jpg",
            },
        ],
        "collections": [
            {
                "name": "Fitness Goals",
                "description": "Marathon training and active lifestyle",
                "post_titles": [
                    "Marathon Training Week 8",
                    "Dog Park Adventures",
                    "Farmers Market Haul",
                    "Baking Sourdough Bread",
                ],
            },
            {
                "name": "Home Life",
                "description": "Pet adventures and home projects",
                "post_titles": [
                    "Dog Park Adventures",
                    "Interior Design Ideas",
                    "Baking Sourdough Bread",
                    "Farmers Market Haul",
                ],
            },
            {
                "name": "Healthy Living",
                "description": "Nutrition and wellness focus",
                "post_titles": [
                    "Farmers Market Haul",
                    "Marathon Training Week 8",
                    "Baking Sourdough Bread",
                    "Dog Park Adventures",
                ],
            },
        ],
    },
    {
        "name": "David Kim",
        "username": "davidk",
        "email": "david.kim@example.com",
        "password": "AbCd1234#",
        "posts": [
            {
                "title": "Woodworking Project",
                "caption": "Building a custom bookshelf for the office",
                "published": True,
                "img_url": "https://i.ibb.co/MD03cGNZ/873-1080x1080.jpg",
            },
            {
                "title": "Local Food Truck Tour",
                "caption": "Trying different cuisines around the city",
                "published": True,
                "img_url": "https://i.ibb.co/jPQvWdg1/916-1080x1080.jpg",
            },
            {
                "title": "Mountain Biking Trail",
                "caption": "Challenging new trail with amazing views",
                "published": True,
                "img_url": "https://i.ibb.co/b5fdcBWR/939-1080x1080.jpg",
            },
            {
                "title": "Chess Tournament Prep",
                "caption": "Studying opening strategies for the weekend tournament",
                "published": False,
                "img_url": "https://i.ibb.co/ywWCbFs/1040-810x1080.jpg",
            },
            {
                "title": "Stargazing Night",
                "caption": "Clear skies perfect for astronomy observations",
                "published": True,
                "img_url": "https://i.ibb.co/rKKfsJXz/1067-1080x1080.jpg",
            },
        ],
        "collections": [
            {
                "name": "Outdoor Sports",
                "description": "Biking and outdoor activities",
                "post_titles": [
                    "Mountain Biking Trail",
                    "Stargazing Night",
                    "Local Food Truck Tour",
                    "Woodworking Project",
                ],
            },
            {
                "name": "Crafts & Hobbies",
                "description": "DIY projects and skill building",
                "post_titles": [
                    "Woodworking Project",
                    "Chess Tournament Prep",
                    "Stargazing Night",
                    "Mountain Biking Trail",
                ],
            },
            {
                "name": "Food Adventures",
                "description": "Culinary explorations and discoveries",
                "post_titles": [
                    "Local Food Truck Tour",
                    "Woodworking Project",
                    "Chess Tournament Prep",
                    "Stargazing Night",
                ],
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
            session.flush()

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
        print("Database seeded successfully!")

    except Exception as e:
        session.rollback()
        print(f"Error seeding database: {e}")
    finally:
        session.close()


if __name__ == "__main__":
    seed_database()
