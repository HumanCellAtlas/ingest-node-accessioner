#!/usr/bin/env node

// start the listeners
const request = require('request-defaults');

request.globalDefaults({
    family: 4,
    pool: {
        maxSockets: 10
    }
});

const config = require("./src/config/config.js")
config.services.uuidListener.start();
