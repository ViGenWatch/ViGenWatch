FROM ubuntu:20.04

ARG user
ARG uid
ARG password

ENV PYTHON_VERSION 3.8
ENV DEBIAN_FRONTEND=noninteractive  

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    tzdata && \
    ln -fs /usr/share/zoneinfo/UTC /etc/localtime && \
    dpkg-reconfigure --frontend noninteractive tzdata && \
    apt-get install -y \
    python3.8 \
    python3.8-dev \
    python3-pip \
    git \
    curl \
    build-essential \
    openssh-server \
    python3-setuptools && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

RUN pip3 install --upgrade pip && \
    pip3 install nextstrain-augur

RUN useradd -G www-data,root -u $uid -d /home/$user $user && \
    mkdir -p /home/$user/ && \
    chown -R $user:$user /home/$user

RUN mkdir /var/run/sshd

RUN echo 'PermitRootLogin yes' >> /etc/ssh/sshd_config && \
    echo 'PasswordAuthentication yes' >> /etc/ssh/sshd_config && \
    echo "$user:${password}" | chpasswd

WORKDIR /augur

USER $user

CMD ["/usr/sbin/sshd", "-D"] 
