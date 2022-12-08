FROM node:16

WORKDIR /code

COPY . /code

ENV API_URL ${API_URL}


RUN npm install

EXPOSE 3000

CMD [ "node", "start.js" ]