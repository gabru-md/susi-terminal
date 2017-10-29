#!/usr/bin/env node

const fs = require('fs-extra');
const chalk = require('chalk');
const S = require('string');
const exec = require('child_process').exec;
const music = require('./config').musicfolder;
const path = require('path');


module.exports = {
	playSong : function(songname){

				if(!fs.existsSync(music)){
					return console.log(chalk.yellow('susi.ai > ') + chalk.red('Music folder not found '));
				}

				fs.readdir(music,function(err,items){

					for(var i = 0 ; i < items.length ; i++){
						if(S(items[i]).contains(songname)){
							console.log(chalk.yellow('susi.ai > ') + 'Playing ' + chalk.blue(items[i]));
							console.log(chalk.yellow('susi.ai > ') + 'Press Ctrl + C to stop.');
							return exec("play " + path.join(music,items[i]),function(err,stdout,stderr){
								if(err){
									console.log(err);
								}else{
								}
							})
						}
					}


				});

			}
}