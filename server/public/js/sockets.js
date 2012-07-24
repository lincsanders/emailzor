//initiate the connection
socket = io.connect('/');

socket.on('pong', function(data){
	console.log('Pong!');
})