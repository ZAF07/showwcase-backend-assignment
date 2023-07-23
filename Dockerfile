FROM node:20.2

WORKDIR /app

COPY ./package*.json .
RUN npm install

# COPY ./config/stage-default.yml ./config


COPY . .
# COPY ./dist .

EXPOSE 3000
CMD [ "npm", "start" ]