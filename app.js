db = require('./db')
var server = require('./server')
logging = process.argv.indexOf("-l") != -1 || process.argv.indexOf("--logging") != -1

db.sync().success(function(){
	console.log('DB: Synchronization success, starting web server.')

	server.listen()
}).error(function(){
	if(logging) console.log('DB: Synchronization error, WILL NOT START SHIT YO.')
})