from fastapi import FastAPI

from .routers import post, user

app = FastAPI()

app.include_router(user.router)
app.include_router(post.router)


@app.get("/")
async def root():
    return {"message": "ArtHive is buzzing!"}
