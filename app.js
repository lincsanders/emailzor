var express = require('express').createServer();
var db = require('./db/db.js')
logging = process.argv.indexOf("-l") != -1 || process.argv.indexOf("--logging") != -1


express.get('/', function(req, res){
	Email.build().save()

	Email.count().success(function(count){
    	res.send(count + ' total emails');
	})
});

db.sync().success(function(){
	console.log('DB: Synchronization success, starting web server.')

	express.listen(3000);
}).error(function(){
	if(logging) console.log('DB: Synchronization error, WILL NOT START SHIT YO.')
})