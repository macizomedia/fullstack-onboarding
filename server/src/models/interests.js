const Interest = sequelize.define('interest', {

	// Column-1, user_id is an object with
	// properties like type, keys,
	// validation of column.
	id:{

		// Sequelize module has INTEGER Data_Type.
		type:Sequelize.INTEGER,

		// To increment user_id automatically.
		autoIncrement:true,

		// user_id can not be null.
		allowNull:false,

		// For uniquely identify user.
		primaryKey:true
	},

    name: {},

    describtion: {},

    // foreign key
	user_id: { type: Sequelize.STRING, allowNull:false },
    
    // foreign key
    project_id: { type: Sequelize.STRING, allowNull:false },
	
    timestamps: {} // system date

});