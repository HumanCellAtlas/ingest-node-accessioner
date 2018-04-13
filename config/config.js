/**
 * Created by rolando on 13/04/2018.
 */
const IngestClient = require('../client');
const UuidListener = require('../listeners');

class Config {
    constructor(){
        // config vars
        this.INGEST_HOST = process.env.INGEST_HOST || 'localhost';
        this.INGEST_PORT = process.env.INGEST_PORT || '8080';
        this.RABBIT_HOST = process.env.RABBIT_HOST || 'localhost';
        this.RABBIT_PORT = process.env.RABBIT_PORT || '15672';
        this.PREFETCH_COUNT = parseInt(process.env.PREFETCH_COUNT || '1');
        this.UUID_EXCHANGE = 'ingest.accession.exchange';
        this.UUID_QUEUE = 'ingest.metadata.accession.queue';

        this.services = {};
        this.services.ingestClient = new IngestClient('http://' + this.INGEST_HOST + ':' + this.INGEST_PORT);
        this.services.uuidListener =  new UuidListener('amqp://' + this.RABBIT_HOST + ':' + this.RABBIT_PORT, this.services.ingestClient);
    }
}

const config = new Config();

module.exports = config;
