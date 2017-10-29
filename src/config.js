#!/usr/bin/env node
const os = require('os');
const path = require('path');

const folder = path.join('/home',os.userInfo().username,'susi.ai','music')

module.exports = {
	musicfolder : folder
}