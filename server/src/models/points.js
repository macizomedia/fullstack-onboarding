const point = sequelize.define('points', {

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

    user_id: {}, // foreign key

    point:{}, // integer

    title:{},
    description: {}, //')->nullable();
    isPrivate: {},   //')->default(0);
    timestamps: {} // system date


});