#!/usr/bin/env node

const fs = require('fs');
const chalk = require('chalk');
const tar = require('tar');
const unzip = require('unzip');
const path = require('path');


module.exports = {
	extract : function(filename){
		if(path.extname(filename) === '.tar.gz' || path.extname(filename) === '.gz' || path.extname(filename) === '.tgz'){
			tar.x({
				file : filename
			}
			).then(_=>{
				conosle.log(chalk.yellow('susi.ai > ') + chalk.blue(filename) + ' extracted to ' + process.cwd());
			})
		}
		else if(path.extname(filename) === '.zip'){
			fs.createReadStream(filename).pipe(unzip.Extract({ path: process.cwd() }));
			console.log(chalk.yellow('susi.ai > ') + chalk.blue(filename) + ' extracted to ' + process.cwd());
		}
		else{
			console.log(chalk.yellow('susi.ai > ') + filename +' : ' + chalk.red('No such file found'));
		}
	}
}