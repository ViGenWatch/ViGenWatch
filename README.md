# Setup Guide for the ViGenWatch Project

## Requirements:

- A personal device with Docker installed

- Nodejs >= v22.4.1

- @khaitd0340/auspice >= v2.59.4

- iqtree2 >= v2.3.6

- nextstrain-augur >= v26.2.0

## Step 1: Clone the project from the GitHub repository

- Open the terminal

- `git clone git@github.com:ViGenWatch/ViGenWatch.git`

## Step 2: Open the project's root directory

- `cd ViGenWatch`

## Step 3: Create .env files in all 3 folders (backend, frontend, and the root directory) based on .env.example

## Step 4: Start Docker to build the image and start the container (add sudo if using Linux)

- `sudo docker compose up --build`

## Step 5: Set up the environment in the Ubuntu service container with root access (add sudo if using Linux)

- `sudo docker exec -it --user root nextclade_ubuntu bash`

- `cd`

- `apt-get update`

- `apt-get install -y software-properties-common`

- `add-apt-repository universe`

- `apt-get update`

- `apt-get install -y mafft raxml fasttree vcftools sqlite3`

## Step 6: Install iqtree2 library separately (still inside the Ubuntu service container)

- `cd`

- `cd /tmp`

- `wget https://github.com/iqtree/iqtree2/releases/download/v2.3.6/iqtree-2.3.6-Linux-intel.tar.gz`

- `tar xf iqtree-2.3.6-Linux-intel.tar.gz`

- `mv iqtree-2.3.6-Linux-intel/bin/iqtree2 /usr/bin/iqtree`

## Step 7: Enable SSH in the Ubuntu service container

- `sudo docker exec -it --user root nextclade_ubuntu bash`

- `cd`

- `ssh-keygen -A`

- `/usr/sbin/sshd -D`

## Step 8: Run migrations to create the database tables

- `sudo docker exec -it nextclade_workspace sh`

- `npx sequelize-cli db:migrate`
