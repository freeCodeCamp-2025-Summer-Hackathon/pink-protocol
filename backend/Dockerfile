# use slim version of python for faster build times
FROM python:3.10-slim 

# only consider files from /app directory
WORKDIR /app

# copy in the requirements file
COPY requirements.txt .

# install dependencies from requirements file that were not previously used (--no-cache-dir)
RUN pip install --no-cache-dir -r requirements.txt

# copy everything else
COPY . .

# expose the port upon which the app will run so it is accessible from outside the container
EXPOSE 8000

# run command to start up the app
CMD ["fastapi", "run"]
# run `docker run -p 8000:8000 -d arthive-app:latest`