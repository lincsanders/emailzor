module.exports.listen = function(server){
	var io = require('socket.io').listen(server)

	io.sockets.on('connection', function (socket) {

		socket.on('ping', function(){
			socket.emit('pong')
		})
	});	
}