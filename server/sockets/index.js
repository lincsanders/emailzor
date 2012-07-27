module.exports.listen = function(server){
	var io = require('socket.io').listen(server)

	io.sockets.on('connection', function (socket) {

		socket.on('ping', function(){
			socket.emit('pong')
		})

		socket.on('request-inbox', function(){
			Email.all().success(function(emails){

				socket.emit('receive-inbox', emails);
			})
		})

		socket.on('request-email', function(data){
			Email.find({where: {id: data.id}}).success(function(email){
				socket.emit('load-email', email);
			})
		})
	});	
}