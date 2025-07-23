from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from starlette.types import ASGIApp, Receive, Scope, Send

from .config import Settings
from .routers import post, user


class DebugMiddleware:
    def __init__(self, app: ASGIApp):
        self.app = app

    async def __call__(self, scope: Scope, receive: Receive, send: Send) -> None:
        if scope["type"] == "http":
            print(f"DEBUG: Request received in DebugMiddleware for path: {scope['path']}")
        await self.app(scope, receive, send)
        if scope["type"] == "http":
            print(f"DEBUG: Response sent from DebugMiddleware for path: {scope['path']}")


settings = Settings()

print(
    f"DEBUG: Session Secret Key loaded: {settings.LOGGED_USER_SECRET_KEY[:10]}... (first 10 chars, length: {len(settings.LOGGED_USER_SECRET_KEY)})"
)

app = FastAPI()
app.add_middleware(DebugMiddleware)
app.add_middleware(
    SessionMiddleware,
    secret_key=settings.LOGGED_USER_SECRET_KEY,
    session_cookie="session",
    max_age=None,
    https_only=False,
    same_site="lax",
    domain="localhost",
)

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
