/**
 * Created by rolando on 03/07/2018.
 */

class Properties {
    constructor() {
        // config vars
        this.vars = {};
        this.vars.INGEST_HOST = process.env.INGEST_HOST || 'localhost';
        this.vars.INGEST_PORT = process.env.INGEST_PORT || '8080';
        this.vars.RABBIT_HOST = process.env.RABBIT_HOST || 'localhost';
        this.vars.RABBIT_PORT = process.env.RABBIT_PORT || '15672';
        this.vars.PREFETCH_COUNT = parseInt(process.env.PREFETCH_COUNT || '1');
        this.vars.UUID_EXCHANGE = 'ingest.accession.exchange';
        this.vars.UUID_QUEUE = 'ingest.metadata.accession.queue';
    }
}

module.exports = new Properties;
