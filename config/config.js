/**
 * Created by rolando on 13/04/2018.
 */
import {IngestClient} from '../client';
import {UuidListener} from '../listeners';

const config = {
    // config vars
    INGEST_HOST : process.env.INGEST_HOST,
    INGEST_PORT : process.env.INGEST_PORT,
    RABBIT_HOST :process.env.RABBIT_HOST,
    RABBIT_PORT : process.env.RABBIT_PORT,
    PREFETCH_COUNT : parseInt(process.env.PREFETCH_COUNT),
    UUID_EXCHANGE : 'ingest.accession.exchange',
    UUID_QUEUE : 'ingest.metadata.accession.queue',

    // singletons
    services: {
        ingestClient : new IngestClient('http://' + this.INGEST_HOST + ':' + this.INGEST_PORT),
        uuidListener : new UuidListener('amqp://' + this.RABBIT_HOST + ':' + this.RABBIT_PORT, this.ingestClient)
    }
};

export default config;
