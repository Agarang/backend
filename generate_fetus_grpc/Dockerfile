#syntax=docker/dockerfile:1

FROM nvidia/cuda:11.6.2-cudnn8-devel-ubuntu20.04 as builder

WORKDIR /app

COPY . .

RUN apt-get update && \
    ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime && \
    apt-get install -y tzdata wget unzip && \
    apt-get install software-properties-common -y && \
    add-apt-repository 'ppa:deadsnakes/ppa' -y && \
    apt-get update && \
    apt-get install curl python3.10 python3.10-dev python3.10-venv python3.10-distutils python3.10-lib2to3 python3.10-gdbm python3.10-tk -y && \
    update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.10 1 && \
    curl -sS https://bootstrap.pypa.io/get-pip.py | python3.10 && \ 
    apt-get -y install libgl1-mesa-glx && \
    apt-get install libglib2.0-0 -y && \
    pip install torch==1.13.1+cu116 torchvision==0.14.1+cu116 torchaudio==0.13.1 --extra-index-url https://download.pytorch.org/whl/cu116 && \
    pip install opencv-python grpcio_tools numpy python-dotenv azure-storage-blob azure-identity scipy pillow ninja click

FROM builder

WORKDIR /app

ENV PYTHONPATH=.

COPY . .

RUN python3 -m venv venv && \
    . ./venv/bin/activate

