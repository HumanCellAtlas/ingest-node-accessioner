/**
 * Created by rolando on 13/04/2018.
 */
const amqp = require('amqplib');
import config from '../config';

class UuidListener {
    constructor(rabbitUrl, ingestClient) {
        this.ingestClient = ingestClient;
        this.rabbitUrl = rabbitUrl;
    }

    start(){
        amqp.connect(this.rabbitUrl).then(conn => {
            return conn.channel();
        }).then(ch => {
            ch.assertExchange(config.UUID_EXCHANGE, 'direct').then(() => {
                ch.assertQueue(config.UUID_QUEUE).then(() => {
                    ch.prefetchCount(config.PREFETCH_COUNT).then(() => {
                        ch.consume(config.UUID_QUEUE, (msg) => {
                           this.ingestClient.assignUuid(msg['callbackLink']);
                        }, {noAck : true});
                    })
                })
            })

        })
    }

}

export default UuidListener;
