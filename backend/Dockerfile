FROM node:22-alpine

WORKDIR /nextclade/backend/

COPY package*.json ./

RUN npm install

RUN npm install -g @babel/core @babel/cli

COPY . .

CMD ["npm", "run", "start"]