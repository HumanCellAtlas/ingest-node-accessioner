/**
 * Created by rolando on 13/04/2018.
 */
const IngestClient = require('../client');
const UuidListener = require("../listeners/uuid-listener");
const properties = require("../properties");

class _Config {
    constructor(){
        this.services = {};
        this.services.ingestClient = new IngestClient('http://' + properties.vars.INGEST_HOST + ':' + properties.vars.INGEST_PORT);
        this.services.uuidListener =  new UuidListener(properties.vars.RABBIT_URL, this.services.ingestClient);
    }
}

module.exports = new _Config;
