FROM node:latest

WORKDIR /nextclade/frontend

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["echo", "React app built"]