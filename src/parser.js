#!/usr/bin/env node

const ArgumentParser = require('argparse').ArgumentParser;

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

parser.addArgument(
	['-play'],
	{
		help : 'Song Name from you Music Folder',
		required : false
	}
)

var args = parser.parseArgs();

module.exports = args;