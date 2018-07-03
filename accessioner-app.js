#!/usr/bin/env node

// start the listeners
const config = require('../config');
config.services.uuidListener.start();
