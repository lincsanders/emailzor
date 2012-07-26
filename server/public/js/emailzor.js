Emailzor = {
	init: function(){
		self = Emailzor;

		self.cacheElements();
		self.connectSocket();

		self.ui.$leftPanel.find('div').on('click', function(e){
			$this = $(this);


			self.ui.$leftPanel.find('div').removeClass('selected');
			$this.addClass('selected');
		})

		Emailzor.ui.$navInbox.on('click', function(e){
			Emailzor.socket.emit('request-inbox');
		});


		Emailzor.socket.emit('request-inbox');
	},

	cacheElements: function(){
		Emailzor.ui = {
			$leftPanel: $("#left-panel"),
			$listPanel: $('#list-panel'),
			$navInbox: $('#nav-inbox')
		}
	},

	connectSocket: function(){
		//initiate the connection
		Emailzor.socket = io.connect('/');

		Emailzor.socket.on('pong', function(data){
			console.log('Pong!');
		});

		Emailzor.socket.on('receive-inbox', function(emails){
			$listPanel = Emailzor.ui.$listPanel;

			$listPanel.empty();
			template = Handlebars.compile($("#email-list-col").html());

			$.each(emails, function(k,email){
				$html = $(template(email))

				$html.on('click', function(){
					$this = $(this);

					Emailzor.ui.$listPanel.find('.email-row').removeClass('selected');
					$this.addClass('selected');
				})

				$listPanel.append($html);
			});
		});
	}
}