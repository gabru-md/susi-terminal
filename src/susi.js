#!/usr/bin/env node

const cheerio = require('cheerio');
const request = require('request');
const ArgumentParser = require('argparse').ArgumentParser;

var parser = new ArgumentParser({
	version : '0.0.1',
	addHelp : true,
	description : 'SUSI Terminal Help'
});

parser.addArgument(
	['-q','-query'],
	{
		help : 'Query String for SUSI Terminal'
	}
);

var args = parser.parseArgs();
/*console.log(args.q);
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

callSUSI(args.q,function(err,data){
	var JSONResponse = JSON.parse(data);
	console.log('susi.ai > ' + JSONResponse.answers[0].actions[0].expression);
})