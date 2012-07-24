//initiate the connection
socket = io.connect('/');

socket.on('pong', function(data){
	console.log('Pong!');
})

socket.on('receive-inbox', function(emails){
	console.log(123)
	$list = $('#list-panel');

	$list.empty();
	template = Handlebars.compile($("#email-list-col").html());

	$.each(emails, function(k,email){
		$list.append(template(email));
	});

	$list.animate({
		left: (parseInt($list.css('left'),10) == 0 ? -$list.outerWidth() : 0)
    });
})