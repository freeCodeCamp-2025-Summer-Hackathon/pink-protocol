from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware

from .config import Settings
from .routers import post, user

settings = Settings()
app = FastAPI()
app.add_middleware(SessionMiddleware, secret_key=settings.LOGGED_USER_SECRET_KEY)

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


@app.get("/")
async def root():
    return {"message": "ArtHive is buzzing!"}
