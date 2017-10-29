#!/usr/bin/env node

const fs = require('fs-extra');
const chalk = require('chalk');
const S = require('string');
const exec = require('child_process').exec;
const music = require('./config').musicfolder;
const path = require('path');


function createMusicFolder(){
	console.log(chalk.yellow('susi.ai > ') + chalk.red('Music folder not found'));
	console.log(chalk.yellow('susi.ai > ') + 'Creating Music Folder');
	fs.mkdirsSync(music);
	console.log(chalk.yellow('susi.ai > ') + 'Folder created as ' + chalk.blue(music));
	console.log('Add Music to this folder so that susi can play them for you');

}

module.exports = {
	playSong : function(songname){

				if(!fs.existsSync(music)){
					return createMusicFolder();
				}

				fs.readdir(music,function(err,items){

					for(var i = 0 ; i < items.length ; i++){
						if(S(items[i].toLowerCase()).contains(songname.toLowerCase())){
							console.log(chalk.yellow('susi.ai > ') + 'Playing ' + chalk.blue(items[i]));
							console.log(chalk.yellow('susi.ai > ') + 'Press Ctrl + C to stop.');
							return exec("play '" + path.join(music,items[i]) + "'",function(err,stdout,stderr){
								if(err){
									console.log(err);
								}
							})
						}
					}


				});

			}
}