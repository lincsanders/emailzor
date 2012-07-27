var express = require('express'),
	server = express.createServer(),
	io = require(__dirname + '/sockets').listen(server)

module.exports.listen = function(){
	server.listen(8000)

	//serve the public folder
	server.use(express.static(__dirname + '/public'))

	//specify the web routes
	server.get('/emails', function(req, res){
		Email.build().save()

		Email.count().success(function(count){
	    	res.send(count + ' total emails');
		})
	});
}