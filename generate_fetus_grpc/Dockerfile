#syntax=docker/dockerfile:1

FROM python:3.9-slim-buster

WORKDIR /app

ENV PYTHONPATH=.

COPY . .

RUN apt-get update && apt-get -y install libgl1-mesa-glx && apt-get install libglib2.0-0 -y && pip install opencv-python grpcio_tools numpy python-dotenv azure-storage-blob azure-identity

CMD ["python3", "src/main.py"]