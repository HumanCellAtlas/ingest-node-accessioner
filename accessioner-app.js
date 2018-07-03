#!/usr/bin/env node

// start the listeners
const config = require("./src/config/config.js")
config.services.uuidListener.start();
