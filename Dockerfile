FROM node:16

WORKDIR /code

COPY . /code

ARG API_URL
ENV API_URL ${API_URL}


RUN npm install

EXPOSE 3000

CMD [ "node", "start.js" ]
