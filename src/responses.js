#!/usr/bin/env node

const Table = require('cli-table');
const chalk = require('chalk');


module.exports = {
	TableReponse : function(data,metaData,callback){
					var cols = data.columns;
					var headers = [];
					var keys = Object.keys(cols);
					keys.map((key)=>{
						headers.push(cols[key]);
					})
					var table = new Table({
						head : headers,
						colWidths : [20,5,20]
					})
					for(var i = 0; i < metaData.length ; i++){
						var content = [];
						for(var j = 0; j < keys.length ; j ++){
							content.push(metaData[i][keys[j]]);
						}
						table.push(content);
					}
					callback(table);
				},
	AnswerResponse : function (data, callback){
					var answer = data.expression;
					callback(answer);
				},
	LinkResponse : function (data, callback){
					var answer = data.text;
					answer = answer + " " + data.link;
					callback(answer);
				}	
}
