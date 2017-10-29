var exec = require('child_process').exec;
var readline = require('readline');

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});
var usid;

/*exec('id -u', function(err, stdout,stderr){
    if(!stdout)
    {
        console.log("You should install the packages manually");
    }
    else{
        usid=stdout;
        console.log(usid);
    }
});*/

exec('which apt-get', function(err,stdout,stderr){
	if(!stdout){
		console.log('Automatic installation isn\'t supported on your system');
		console.log('Please install sox and libsox-fmt-mp3 using your package manager');
		process.exit(1);
	}
	else{
		console.log('sox and libsox-fmt-mp3 can be automatically installed on your system using apt-get');
		console.log('You may need to enter your password');
		rl.question('Would you like to install these packages? [Y/n]', function(answer){
			if (answer.match(/^y/i)){
				var installation = exec('sudo apt-get install sox libsox-fmt-mp3', function(err, stdout, stderr){
				console.log(stdout);
				});
				installation.stdout.on('data', function(data){
					process.stdout.write(data);
				});
				installation.stderr.on('data', function(data){
						process.stdout.write(data);
				});
				installation.on('close', function(code){
					console.log('packages installed successfully');
					process.exit(0);
				});
			}
		});
	}
});
