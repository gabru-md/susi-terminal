#!/usr/bin/env node
const figlet = require('figlet');
const chalk = require('chalk');

module.exports = {
	desc : function(){
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
        }
