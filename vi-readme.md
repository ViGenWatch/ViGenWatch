# Hướng dẫn cài đặt môi trường cho dự án ViGenWatch

## Yêu cầu:

- Thiết bị cá nhân đã cài đặt docker
- Nodejs >= v22.4.1
- @khaitd0340/auspice >= v2.59.4
- iqtree2 >= v2.3.6
- nextstrain-augur >= v26.2.0

## Bước 1: Clone dự án từ repository github

- Mở terminal
- git clone git@github.com:ViGenWatch/ViGenWatch.git

## Bước 2: Mở thư mục gốc của dự án

- cd ViGenWatch

## Bước 3: Tạo các file .env ở cả 3 folder backend, frontend và thư mục gốc theo .env.example

## Bước 4: Khởi chạy docker để build Image và khởi động container (Thêm sudo nếu dùng Linux)

- sudo docker compose up --build

## Bước 5: Setup môi trường trong container của service ubuntu với quyền truy cập root (Thêm sudo nếu dùng Linux)

- sudo docker exec -it --user root nextclade_ubuntu bash
- cd
- apt-get update
- apt-get install -y software-properties-common
- add-apt-repository universe
- apt-get update
- apt-get install -y mafft raxml fasttree vcftools sqlite3

## Bước 6: Install riêng thư viện iqtree2 (vẫn trong container của service ubuntu)

- cd
- cd /tmp
- wget https://github.com/iqtree/iqtree2/releases/download/v2.3.6/iqtree-2.3.6-Linux-intel.tar.gz
- tar xf iqtree-2.3.6-Linux-intel.tar.gz
- mv iqtree-2.3.6-Linux-intel/bin/iqtree2 /usr/bin/iqtree

## Bước 7: Bật SSH trong container của service ubuntu

- sudo docker exec -it --user root nextclade_ubuntu bash
- cd
- ssh-keygen -A
- /usr/sbin/sshd -D

## Bước 8: Chạy migrate để tạo bảng cho cơ sở dữ liệu

- sudo docker exec -it nextclade_workspace sh
- npx sequelize-cli db:migrate
