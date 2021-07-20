
/**
 * Module dependencies.
 */

const express = require('express')
	, http = require('http')
	, path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors')
const methodOverride = require('method-override');

const app = express();

require('dotenv').config();

// all environments
app.set('port', process.env.PORT || 4040);
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors({
    origin: '*'
}));
/* app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
}); */

//app.use(express.static(path.join(__dirname, 'public')));

const routerProjects = require('./routers/projects');
const routerSessions = require('./routers/sessions');
const routerUsers = require('./routers/users');
// app.use('/projects', routerProjects); 

app.use('/', (req, res, next) => {

	// first checks can be done here
	try {

		if (req.header('x-api-key') === process.env.API_KEY) {

			next();
		} else throw 'error';

	} catch (error) {
		res.status('401').send('ApiKey is missing!');
	}


});

//projects operations - crud
app.use('/api/v1/projects', routerProjects);

// login opereations - login - logout - auth.
app.use('/api/v1/sessions', routerSessions);

// users - Crud
app.use('/api/v1/users', routerUsers);

//app.use('/projects/:projectId/tasks', routerTasks ); 

// development only
if ('development' == app.get('env')) {
	// its development
	console.log('its dev.')
}


// 404 error
app.all('*', (req, res, next) => {
	// const err = new HttpException(404, 'Endpoint Not Found');
	// next(err);
});

app.server = http.createServer(app).listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
