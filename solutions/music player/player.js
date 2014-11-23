var http = require('http');
var fs = require('fs');
var portNumber = 3000;

var playerRenderer = function(callback) {
	fs.readFile('music_player.html', 
		function(err, data) {
			if(err) {
				//console.log(error);
				throw error;
			}
			callback(data);
		});
};

var server = http.createServer(function(req, res){
	if (req.url.match(/\/$/)) {
		//console.log('match successful!');
		res.writeHead(200, {'Content-Type': 'text/html'});

		playerRenderer(
				function(result) {
					//console.log('callback: ' + result);
					res.write(result);
					res.end();
				});
	}
else {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.write("Try <a href= \'/\'>here!</a>");
    res.end();
    return;
};
}).listen(portNumber);
console.log('Server listening at port: ' + portNumber + '...');