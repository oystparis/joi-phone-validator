'use strict'

const fs = require('fs')
fs.writeFileSync('.npmrc', `//registry.npmjs.org/:_authToken=${process.env.NPM_TOKEN}`)
fs.chmodSync('.npmrc', '0600')
