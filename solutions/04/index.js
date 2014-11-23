var portNumber = 3000;

var http = require('http');
var fs = require('fs');

var contentHandler = function(callback) {
	fs.readFile('content.html', 
		function(err, data) {
			if(err) {
				//console.log(error);
				throw error;
			}
			callback(data);
		});
};

var server = http.createServer(function(req, res) {
	if (req.url.match(/\/content$/)) {
		//console.log('match successful!');
		res.writeHead(200, {'Content-Type': 'text/html'});

		contentHandler(
				function(result) {
					//console.log('callback: ' + result);
					res.write(result);
					res.end();
				});
	}

	else if(req.url.match(/\//)){
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write("Pesho");
		res.end();
	}

	else {
	    res.writeHead(404, {'Content-Type': 'text/html'});
	    res.write("Try <a href= \'/content\'>here!</a>");
	    res.end();
	    return;
	};

	//console.log(req.url);
}).listen(portNumber);
console.log("Server listening at port: " + portNumber + " ...");