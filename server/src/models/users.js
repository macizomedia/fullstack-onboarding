// Include Sequelize module.
const Sequelize = require('sequelize')

// Import sequelize object,
// Database connection pool managed by Sequelize.
const sequelize = require('../db/database');

// Define method takes two arrguments
// 1st - name of table
// 2nd - columns inside the table
const User = sequelize.define('user', {

	// Column-1, user_id is an object with
	// properties like type, keys,
	// validation of column.
	id: {

		// Sequelize module has INTEGER Data_Type.
		type: Sequelize.UUID,

		defaultValue: Sequelize.UUIDV4,

		primaryKey: true,

		// user_id can not be null.
		allowNull: false,

		// For uniquely identify user.
		primaryKey: true

	},

	// Column-2, name
	name: { type: Sequelize.STRING, allowNull: false },

	// Column-3, email
	email: { type: Sequelize.STRING, allowNull: false, unique: true },

	// Column-4 
	password: { type: Sequelize.STRING, allowNull: false },

	sumPoints: { type: Sequelize.INTEGER, defaultValue: 500 },

	status: {
		type: Sequelize.ENUM('pending', 'active', 'inactive'),
		defaultValue: 'pending'
	},

	roles: {
		type: Sequelize.ENUM('user', 'admin'),
		defaultValue: 'user'
	},

	// Column-5, default values for
	// dates => current time
	email_verified_at: Sequelize.DATE,

	// Column-6
	avatar: { type: Sequelize.STRING, allowNull: true },

	createdAt: Sequelize.DATE,
	updatedAt: Sequelize.DATE,

});

// Exporting User, using this constant
// we can perform CRUD operations on
// 'user' table.
module.exports = User
