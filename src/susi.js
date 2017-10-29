#!/usr/bin/env node

const request = require('request');
const chalk = require('chalk');
const Table = require('cli-table');
const path = require('path');
const description = require('./description');
const args = require('./parser');
const responses = require('./responses');
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
else if(args.play){
	music.playSong(args.play);
}
else {
    description.desc();
}
