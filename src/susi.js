#!/usr/bin/env node

const request = require('request');
const ArgumentParser = require('argparse').ArgumentParser;
const chalk = require('chalk');

var parser = new ArgumentParser({
	version : '0.0.1',
	addHelp : true,
	description : 'SUSI Terminal Help'
});

parser.addArgument(
	['-q'],
	{
		help : 'Query String for SUSI Terminal',
		required : false
	}
);

parser.addArgument(
	['-search'],
	{
		help : 'Search for something on web',
		required : false
	}
);

var args = parser.parseArgs();
/*console.log(args);
*/
/*console.log('Hello I am SUSI');
*/


function callSUSI(req,callback){
	let api = 'https://api.susi.ai/susi/chat.json?q='
	var url = api + req;
/*	console.log(url);
*/	request(url,(err,response,data)=>{
		callback(err,data);
	});
}


if(args.q){
	callSUSI(args.q,function(err,data){
		if(err){
			console.log(err);
		}else{
			var JSONResponse = JSON.parse(data);
			console.log(chalk.yellow('susi.ai > ') + JSONResponse.answers[0].actions[0].expression);
		}
	})
}else if(args.search){
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