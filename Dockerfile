FROM node:current-slim

WORKDIR /workspace

# COPY package.json .

COPY . .

# COPY . /workspace

RUN npm install

# RUN mkdir /workspace

# ADD . /workspace

# ENV port=8080

EXPOSE 4000

CMD [ "npm", "run", "dev:server" ]

# COPY . .