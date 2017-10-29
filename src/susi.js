#!/usr/bin/env node

const request = require('request');
const chalk = require('chalk');
const Table = require('cli-table');
const path = require('path');
const figlet = require('figlet');
const args = require('./parser');
const responses = require('./responses');
const setConfig = require('./setConfig');
const music = require('./music');

function callSUSI(req,callback){
	let api = 'https://api.susi.ai/susi/chat.json?q='
	var url = api + req;
	request(url,(err,response,data)=>{
		callback(err,data);
	});
}


if(args.q){
	callSUSI(args.q,function(err,data){
		if(err){
			console.log(err);
		}else{
			var JSONResponse = JSON.parse(data);
			if(!JSONResponse.answers[0]){
				console.log(chalk.yellow('susi.ai > ') + chalk.red('No valid response found'));
				return;
			}
			var metaData = JSONResponse.answers[0].data;
			var data = JSONResponse.answers[0].actions;
			//var dataType = data[data.length - 1].type;
			for(var dataType = 0;dataType < data.length; dataType++)
			{ 
				if(data[dataType].type === 'table' ){
						console.log(chalk.yellow('susi.ai > '));
						responses.TableReponse(data[dataType],metaData,(response)=>{
							console.log(response.toString());
						})
					}
				else if(data[dataType].type === 'answer'){
					responses.AnswerResponse(data[dataType],(response)=>{
						console.log(chalk.yellow('susi.ai > ') + response);
					})
				}
				else if(data[dataType].type === 'anchor'){
					responses.LinkResponse(data[dataType],(response)=>{
						console.log(chalk.yellow('susi.ai > ') + response);
					})			
				}
				}
		}
	})
}
else if(args.search){
	var req = 'search for ';
	callSUSI(req + args.search,function(err,data){
		if(err){
			console.log(err);
		}else{
			var JSONResponse = JSON.parse(data);
			console.log(chalk.yellow('susi.ai > ') + JSONResponse.answers[0].actions[0].expression);
		}
	})
}
else if(args.config){
	setConfig.setConfig(args.config);
}
else if(args.play){
	music.playSong(args.play);
}
else{
    var banner = "SUSI.AI";
    figlet(banner,{font:"Standard"},function(err,data){
		if(err){
			return console.log(chalk.red(err));
		}
		else{
			console.log(chalk.blue(data));
			console.log(chalk.yellow('\tMeet SUSI.AI, Your Artificial Intelligence for Personal Assistants, Robots, Help Desks and Chatbots.'));
			console.log(chalk.cyanBright.bold("\n\tAsk it questions. Tell it to do things. Always ready to help."));
			console.log('\n\tSUSI.AI is available for any android, iOS device and also you can access the web chat application from this URL https://chat.susi.ai\n');
			console.log(chalk.yellowBright.bold('\tSUSI is having many skills. You can look at the collection of skills at https://skills.susi.ai.'));
			console.log(chalk.blueBright.bold('\n\tSUSI.AI is Open Source. The code is always available for security reviews and can be improved by anyone with the knowledge and understanding online.'));
			console.log(chalk.magentaBright.bold('\n\tType susi -h for help.Have a great Experience :)\n'));
		}
	});
}
