// Include Sequelize module.
const Sequelize = require('sequelize')

// Import sequelize object,
// Database connection pool managed by Sequelize.
const sequelize = require('../db/database');


const project = sequelize.define('project', {

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
	
    user_id: { 
		type: Sequelize.UUID,
		allowNull: false
	}, // foreign key

    point:{type:Sequelize.INTEGER}, // integer

    title:{ type: Sequelize.STRING},
    description: { type: Sequelize.STRING }, //')->nullable();
    isPrivate: { type: Sequelize.BOOLEAN },   //')->default(0);
    timestamps: {} // system date

});