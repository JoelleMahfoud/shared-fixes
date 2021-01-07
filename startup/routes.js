const bodyParser = require("body-parser");
const cors = require("cors");
var corsOptions = { origin: "http://localhost:8081" };

const authRoutes = require('../routes/auth.routes');
const usersRoutes = require('../routes/user.routes.js');
const coursesRoutes = require('../routes/course.routes');

module.exports = function (app) {
	app.use(function (req, res, next) {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

	app.use(cors(corsOptions));
	app.use(bodyParser.json()); // parse requests of content-type - application/json
	app.use(bodyParser.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded


	// simple home route => don't use this for others
	app.get("/", (req, res) => {
		res.json({ message: "Welcome to IJAM." });
	});

	app.use('/api/auth', authRoutes)
	app.use('/api/users', usersRoutes);
	app.use('/api/courses', coursesRoutes);
	// add new routes with a similar format

	// simple redirection route so users can't access undefined routes
	app.use('*', function (req, res) {
		console.log(req.originalUrl);
		return res.redirect('/');
	})
}
