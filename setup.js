'use strict';

const fs = require('fs');

// Create the development environment varables
fs.createReadStream('.dev-env').pipe(fs.createWriteStream('.env'));