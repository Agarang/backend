# syntax=docker/dockerfile:1

FROM python:3.9-slim-buster

ENV PYTHONPATH=.

WORKDIR /app

COPY . .

RUN apt-get update && \
    pip install --upgrade pip && \
    pip install -r requirements.txt