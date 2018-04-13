#!/usr/bin/env node

// start the listeners
import {config} from '../config';
config.services.uuidListener.start();
