import httpx
from fastapi import UploadFile

from .config import settings

IMGBB_UPLOAD_URL = "https://api.imgbb.com/1/upload"


# Uploads image to imgBB and returns parsed JSON data
async def upload_img(file: UploadFile) -> dict:
    if not settings.IMGBB_API_KEY:
        raise ValueError("IMGBB_API_KEY not set in environment viariables.")

    files = {"image": (file.filename, file.file.read(), file.content_type)}
    data = {"key": settings.IMGBB_API_KEY}

    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(IMGBB_UPLOAD_URL, files=files, data=data)
            response.raise_for_status()
            response_data = response.json()

            if response_data.get("success"):
                return response_data["data"]
            else:
                raise Exception(
                    f"imgBB upload failed: {response_data.get('error', 'Unknown error')}"
                )

        except httpx.HTTPStatusError as e:
            print(f"HTTP error during imgBB upload: {e.response.status_code} - {e.response.text}")
            raise Exception(f"Image upload failed due to HTTP error: {e.response.status_code}")

        except httpx.RequestError as e:
            print(f"Network error during imgBB upload: {e}")
            raise Exception("Image upload failed due to network error.")

        except Exception as e:
            print(f"An unexpected error ocurred during image upload: {e}")
            raise
