// login operations will be handled here...
// jwt token
// user operations will be handled here...
const session = require('express').Router();
const HttpException = require('../utils/HttpException');
const userModel = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

session.use('/', (req, res, next) => {
    // implement your middleware here (if needed))
    console.log('');
    next();

});

session.route('/')
    .post(async (req, res) => {
        // login
        try {
            const { email, password: pass } = req.body;

            const user = await userModel.findOne({ where: { email } });
            
            
            if (!user ) {
                throw new HttpException(401, 'Unable to login!');
            }
            
            // ## user needs to be activated
            // activate this when you complete the email activation
            // if(!(user.status === userModel.rawAttributes.status.values[1])){
            //     throw new HttpException(401, 'User should be activated!');
            // }

            const isMatch = await bcrypt.compare(pass, user.password);

            if (!isMatch) {
                throw new HttpException(401, 'Incorrect password!');
            }

            // user matched!
            const secretKey = process.env.SECRET_JWT || "";
            const token = jwt.sign({ user_id: user.id.toString() }, secretKey, {
                expiresIn: '24h'
            });

            const { password, ...userWithoutPassword } = user.dataValues;

            res.send({ userWithoutPassword, token });

        } catch (error) {
            res.status(error.status).send(error.toString());
        }

    })
    .delete(async (req, res) => {
        // log out
        res.send('no need!');
    });

session.route('/verify/:email/:token')
    .get(async (req, res) => {
        try {
            // activate the user...
            const { email, token } = req.params;

            // decode the token
            const secretKey = process.env.SECRET_JWT || "";
            const decoded = jwt.verify(token, secretKey);

            // get the user from db
            const user = await userModel.findOne({ where: { email: decoded.email } });

            if (!(user.email === email)) {
                throw new HttpException(500, 'Email address mismatch!');
            }
            // 0: pending
            if(!(user.status === userModel.rawAttributes.status.values[0])){
                throw new HttpException(500, 'User cannot be activated!');
            }

                // verfiy 1: active
                user.update({status: userModel.rawAttributes.status.values[1]});
                const result = await user.update();

                if (!result) {
                    throw new HttpException(500, result.toString());
                }

            res.status(201).send('User is activated');

        } catch (error) {
            res.status(error.status || '500').send(error.toString());
        }

    });

session.route('/verify')
    .get(async (req, res) => {
        // activate the user...
        const { email, token } = req.query;

    })
    .post(async (req, res) => {
        // send the activation link via email
        try {
            const { email } = req.body;

            // check the user in db
            const user = await userModel.findOne({ where: { email } });

            if (!user) {
                throw new HttpException(400, 'No user with this email!');
            }

            // create a unique token for email 
            const secretKey = process.env.SECRET_JWT || "";
            const token = jwt.sign({ email: user.email.toString() }, secretKey, {
                expiresIn: '48h'
            });

            // ask Cornelius about the smtp server details
            let transporter = nodemailer.createTransport({
                //name: process.env.EMAIL_NAME,
                host: process.env.EMAIL_HOST,
                port: process.env.EMAIL_PORT,
                secure: true, // use SSL
              auth: {
               user: process.env.EMAIL_USER, //    username for your mail server
               pass: process.env.EMAIL_PASS, 
             },

            });

            user.email = 'oguzkarademirci@gmail.com';

            let mailOptions = {
                from: 'no-reply@voterookie.com',
                to: user.email,
                subject: 'Account Verification Link',
                text: 'Hello ' + user.name + ',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + 'localhost:3000' + '\/sessions\/verify\/' + user.email + '\/' + token + '\n\nThank You!\n'
            };
            let result = await transporter.sendMail(mailOptions);

            if (!result) {
                throw new HttpException(500, 'Mail server error!');
            }

            res.status(201).send('Verification email sent.');

        } catch (error) {
            res.status(400).send(error.toString());
        }

    });

session.route('/authenticate/facebook')
    .get(async (req, res) => {
        // activate the user...
    });

session.route('/authenticate/google')
    .get(async (req, res) => {
        // activate the user...
    });
session.route('/authenticate/etc.')
    .get(async (req, res) => {
        // activate the user...
    });
module.exports = session;