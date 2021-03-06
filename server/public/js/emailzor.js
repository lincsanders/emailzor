Emailzor = {
	init: function(){
		self = Emailzor;

		self.cacheElements();
		self.connectSocket();

		self.ui.$leftPanel.find('div').on('click', function(e){
			var $this = $(this);


			self.ui.$leftPanel.find('div').removeClass('selected');
			$this.addClass('selected');
		});

		Emailzor.ui.$navInbox.on('click', function(e){
			Emailzor.socket.emit('request-inbox');
		});


		Emailzor.socket.emit('request-inbox');
	},

	cacheElements: function(){
		Emailzor.ui = {
			$leftPanel: $("#left-panel"),
			$listPanel: $('#list-panel'),
			$rightPanel: $('#right-panel'),
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
					var $this = $(this);
					Emailzor.requestEmail($this.attr('data-id'));

					Emailzor.ui.$listPanel.find('.email-row').removeClass('selected');
					$this.addClass('selected');
				})

				$listPanel.append($html);
			});
		});

		Emailzor.socket.on('load-email', Emailzor.loadEmail);
	},

	requestEmail: function(id){
		Emailzor.socket.emit('request-email', {id: id});
	},

	loadEmail: function(email){
		Emailzor.ui.$rightPanel.html('');
		Emailzor.ui.$rightPanel.html(email.body);
	}
};