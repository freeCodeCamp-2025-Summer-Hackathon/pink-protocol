from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# from starlette.middleware.sessions import SessionMiddleware # Might be needed for session auth later
from .config import Settings
from .routers import collection, post, user

settings = Settings()
app = FastAPI()


origins = [
    "http://localhost:5173",
    "http://localhost:4173",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:4173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user.router)
app.include_router(post.router)
app.include_router(collection.router)


@app.get("/")
async def root():
    return {"message": "ArtHive is buzzing!"}
