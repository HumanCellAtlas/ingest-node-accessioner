/**
 * Created by rolando on 13/04/2018.
 */
const IngestClient = require('../client');
const UuidListener = require('../listeners');

const config = {
    // config vars
    INGEST_HOST : process.env.INGEST_HOST || 'localhost',
    INGEST_PORT : process.env.INGEST_PORT || '8080',
    RABBIT_HOST :process.env.RABBIT_HOST || 'localhost',
    RABBIT_PORT : process.env.RABBIT_PORT || '15672',
    PREFETCH_COUNT : parseInt(process.env.PREFETCH_COUNT || '1'),
    UUID_EXCHANGE : 'ingest.accession.exchange',
    UUID_QUEUE : 'ingest.metadata.accession.queue',

    // singletons
    services: {
        ingestClient : new IngestClient('http://' + this.INGEST_HOST + ':' + this.INGEST_PORT),
        uuidListener : new UuidListener('amqp://' + this.RABBIT_HOST + ':' + this.RABBIT_PORT, this.ingestClient)
    }
};

module.exports = config;
