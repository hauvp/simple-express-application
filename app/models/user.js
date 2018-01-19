var mongoose = require('mongoose')
var bcrypt = require('bcrypt')

var Schema = mongoose.Schema

var User = new Schema({
	email: {
		type: String,
		index: {
			unique: true
		}
	},
	password: String
})

User.methods.generateHashPassword = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

User.methods.comparePassword = function(password) {
	var _self = this
	return bcrypt.compareSync(password, _self.password)
}

module.exports = mongoose.model('User', User)