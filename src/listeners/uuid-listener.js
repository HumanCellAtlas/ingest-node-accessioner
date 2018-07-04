/**
 * Created by rolando on 13/04/2018.
 */
const amqp = require('amqplib');
const config = require('../config/config');
const properties = require('../properties');

class UuidListener {
    constructor(rabbitUrl, ingestClient) {
        this.ingestClient = ingestClient;
        this.rabbitUrl = rabbitUrl;
        this.properties = properties;
    }

    start(){
        amqp.connect(this.rabbitUrl).then(conn => {
            return conn.createChannel();
        }).then(ch => {
            ch.assertExchange(this.properties.vars.UUID_EXCHANGE, 'direct').then(() => {
                ch.assertQueue(this.properties.vars.UUID_QUEUE, {durable: false}).then(() => {
                    ch.prefetch(this.properties.vars.PREFETCH_COUNT).then(() => {
                        ch.consume(this.properties.vars.UUID_QUEUE, (msg) => {
                            this.handle(msg);
                        }, {noAck : true});
                    })
                })
            })

        })
    }

    handle(msg){
        let callbackLink = JSON.parse(msg.content)['callbackLink'];
        console.info("Received message to accession document " + callbackLink);

        this.ingestClient.assignUuid(callbackLink)
            .then(response => {
                console.log("Successfully assigned uuid to document " + callbackLink);
            }).catch(err => {
                console.warn("Failed to assign uuid to document " + callbackLink + ". Error: " + err);
        });
    }

}

module.exports = UuidListener;
