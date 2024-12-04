FROM node:22-alpine

ARG uid

WORKDIR /nextclade/backend/

COPY package*.json ./

RUN npm install

RUN npm install -g @babel/core @babel/cli

COPY . .

RUN chown -R $uid:$uid /nextclade/backend/ && \
    chmod -R 775 /nextclade/backend/

CMD ["npm", "run", "start"]