// user operations will be handled here...
const user = require('express').Router()
const HttpException = require('../utils/HttpException')
const userModel = require('../models/users')
const auth = require('../middlewares/authorizer')
const userValidator = require('../middlewares/userValidator')
const bcrypt = require('bcrypt')

user.use('/', async (req, res, next) => {
    // if its post, we should not check the auth.
    if (!(req.method === 'POST')) {
        await auth({}, req, res, next)
    } else {
        await userModel.sync() //{ force: true });
        next()
    }
})

// user.route('/interest')
//     .get(async () => {});

user.route('/:userId')
    .get(async (req, res) => {
        // get by userid
        try {
            if (req.currentUser.id == req.params.userId) {
                //its fine
                const { password, ...userWithoutPassword } =
                    req.currentUser.dataValues
                res.send(userWithoutPassword)
            } else {
                //do extra check
                throw new HttpException(401, 'Unauthorized')
            }
        } catch (error) {
            res.status(error.status || '500').send(error.toString())
        }
    })
    .patch(async (req, res) => {
        // update the user(partitial update)
        res.send({})
    })
    .delete(async (req, res) => {
        // delete the user
        res.send({})
    })

user.route('/')
    .get(async (req, res) => {
        // get all users
    })
    .post(async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        console.log(req.body)
        // create user
        try {
            // 1) validate request body - we can use express-validator
            //userValidator.createUserValidator;

            // 2) Hash the password
            req.body.password = await bcrypt.hash(req.body.password, 8)

            // 3) create the user

            const user = await userModel.create(req.body)
            const result = await user.save() // save it to db

            if (!result) {
                throw new HttpException(500, 'Something went wrong')
            }
            
            res.status(201).send('User was created!')
        } catch (error) {
            res.status(error.status || '500').send(error.original.toString())
        }
    })

module.exports = user
