# ArtHive

## About the Project
ArtHive is a social-media platform that enables users to post art, engage with art from other users, and create collections of posts with a theme!

This project was completed by pink-protocol as part of [freeCodeCamp's](https://www.freecodecamp.org/) 2025 Hackathon!

## Usage
* To use ArtHive locally, copy this repository with `git clone https://github.com/freeCodeCamp-2025-Summer-Hackathon/pink-protocol`.

### Environment Variables
* Include a `.env` file in the project root with the following variables (replace fields encapsulated in "\[\]" with your own values):

```
DATABASE_NAME=arthive
DATABASE_HOSTNAME=postgres-db
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=password # (note: this password will not be used in the docker setup)
DATABASE_PORT=5432
SECRET_KEY=[somerandom64charstring]
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

### Docker Setup
* To use ArtHive, ensure that you have [docker](https://www.docker.com/) installed and running. In the project root, run `docker pull pinkprotocol/arthive-app-backend`.

#### Docker Secrets
* Include a `backend/db_password.txt` file with the following:
\[password\]

#### Running the App
* In the project root, run `docker compose up -d`. Navigate to [http://127.0.0.1:8000/](http://127.0.0.1:8000/) and get buzzing! To shut down the app, run `docker compose down -v` (the `-v` flag is optional, using it removes data from the volume).
  * If you want to run the app using your latest changes to the backend, run `docker compose up --build`.
  * If you want to pull the latest images from Docker Hub, use `docker compose -f compose.prod.yaml up`

### Local Setup

#### Installing Python Dependencies
* Set up a virtual environment in the `backend/` directory with `python3 -m venv [your_venv_here]`.
* While your venv is active, run `pip install -r requirements.txt`.

#### Setting Up postgres Database
* Install `postgresql-client` using `sudo apt install postgresql-client` or your system's equivalent.
* Open the `psql` terminal `psql` by running `sudo service postgresql start`, then `sudo -u [system username] psql` or your system's equivalents. Make sure the `system-username` matches the one specified in the `.env` file.
* In the `psql` terminal, run `CREATE DATABASE [your_db_name];`, specifying the name you want for the database. Make sure this matches the name specified in the `.env` file.
* Exit the `psql` terminal with `\q`. 

#### Migrating the Database
* Run `alembic init` and `alembic upgrade head` to initialize the tables.

#### Starting the FastAPI App
* While your venv is active, run `uvicorn [path_to_app_dir]/app.main:app --reload` or `fastapi run`.
* Navigate to [http://0.0.0.0:8000/](http://0.0.0.0:8000/) and get buzzing! To shut down the app, stop it in the terminal or close the window.

## Acknowledgements
Thank you to freeCodeCamp, the hackathon leaders & staff, and Naomi for organizing this hackathon and providing your support/mentorship!