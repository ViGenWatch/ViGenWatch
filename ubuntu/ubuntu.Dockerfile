FROM ubuntu:20.04

ARG user
ARG uid

ENV PYTHON_VERSION 3.8

RUN apt-get update && apt-get install -y \
    python3.8 \
    python3.8-dev \
    python3-pip \
    git \
    curl \
    build-essential \
    python3-setuptools 

RUN pip3 install --upgrade pip && \
    pip3 install nextstrain-augur

RUN apt-get clean && rm -rf /var/lib/apt/lists/*

RUN useradd -G www-data,root -u $uid -d /home/$user $user

RUN mkdir -p /home/$user/ && \
    chown -R $user:$user /home/$user

WORKDIR /augur

USER $user


