import os
from pathlib import Path
from typing import Optional

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_hostname: str
    database_port: str
    database_name: str
    database_password: Optional[str] = None
    database_username: str
    secret_key: str
    algorithm: str
    access_token_expire_minutes: int

    IMGBB_API_KEY: str
    # Test if the model_config variable is needed here

    # LOGGED_USER_SECRET_KEY: str

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        # Set password after initialization
        if not self.database_password:
            self.database_password = get_db_password()

    class Config:
        env_file = "../.env"


def get_db_password():
    # get docker secret
    secret_path = Path("/run/secrets/db_password")
    if secret_path.exists():
        return secret_path.read_text().strip()

    # get local password
    local_path = Path("../db_password.txt")
    if local_path.exists():
        return local_path.read_text().strip()

    # Fall back to environment variable
    password = os.getenv("DATABASE_PASSWORD", "")
    if password:
        return password

    raise ValueError(
        "check that compose.yaml secret, db_password.txt, or environment variable has password"
    )


settings = Settings()
