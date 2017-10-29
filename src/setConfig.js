#!/usr/bin/env node

const fs = require('fs');
const chalk = require('chalk');
const path = require('path');

module.exports = {
	setConfig : function(folder){
					console.log(path.join(__dirname,'config.js'));
					fs.readFile(path.join(__dirname,'config.js'), 'utf-8', function(err, data){
						if (err) throw err;

						var newValue = data.replace('YOUR MUSIC FOLDER HERE', folder);

						fs.writeFile(path.join(__dirname,'config.js'), newValue, 'utf-8', function (err) {
							if (err) throw err;
							console.log(chalk.yellow('susi.ai > ') + folder + chalk.green(' set as default music folder'));
						});
					});

				}
};