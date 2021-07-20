const HttpException = require('../utils/HttpException');
const userModel = require('../models/users');
const jwt = require('jsonwebtoken');


const auth = async (roles, req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            const bearer = 'Bearer ';

            //const user = await userModel.findByPk( 1 );

            if (!authHeader || !authHeader.startsWith(bearer)) {
                throw new HttpException(401, 'Access denied. No credentials sent!');
            }

            const token = authHeader.replace(bearer, '');
            const secretKey = process.env.SECRET_JWT || "";

            // Verify Token
            const decoded = jwt.verify(token, secretKey);

            // get the user 
            const user = await userModel.findByPk( decoded.user_id );//,   { attributes: { exclude: ['password'] } } );

            if (!user) {
                throw new HttpException(401, 'Authentication failed!');
            }

            // check if the current user is the owner user
            const ownerAuthorized = req.params.id == user.id;

            // if the current user is not the owner and
            // if the user role don't have the permission to do this action.
            // the user will get this error
            if (!ownerAuthorized && roles.length && !roles.includes(user.role)) {
                throw new HttpException(401, 'Unauthorized');
            }
            
            // if the user has permissions
            //user.token = token;
            req.currentUser = user;
            next();

        } catch (error) {
            res.status(error.status || '401').send(error.toString());
        }
}

module.exports = auth;