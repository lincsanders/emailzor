Sequelize = require("sequelize")
module.exports = new Sequelize('main', null, null, {
	 dialect: 'sqlite',
	 storage: './db/storage/data.db',
})
module.exports.Sequelize = Sequelize

require("fs").readdirSync(__dirname + '/models').forEach(function(file) {
  require(__dirname + '/models/' + file);
});
