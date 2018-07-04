FROM node:8-alpine

ENV INGEST_HOST=localhost
ENV INGEST_PORT=8080
ENV RABBIT_HOST=localhost
ENV RABBIT_PORT=5672
ENV PREFETCH_COUNT=1
ENV UUID_EXCHANGE=ingest.accession.exchange
ENV UUID_QUEUE=ingest.metadata.accession.queue

RUN mkdir /app

COPY src /app/src
COPY accessioner-app.js /app/accessioner-app.js
COPY package.json /app/package.json

WORKDIR /app

RUN npm install

CMD node accessioner-app.js
