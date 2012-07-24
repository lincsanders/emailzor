var parent = module.parent.exports
var db = parent
var Sequelize = parent.Sequelize;

Email = db.define('Email', {
  from: Sequelize.STRING,
  to: Sequelize.STRING,
  subject: Sequelize.TEXT,
  body: Sequelize.TEXT
}, {
  underscored: true
})