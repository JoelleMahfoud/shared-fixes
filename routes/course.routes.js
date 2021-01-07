const router = require('express').Router();
const Course = require('../models/Course');


router.get("/", function (req, res) {
	console.log("getting all courses");
	Course.find()
		.exec(function (err, courses) {
			if (err) {
				res.send("error has occured")
			} else {
				console.log(courses);
				res.json(courses)
			}
		})
});

router.get("/:id", function (req, res) {
	console.log("fetching a course");
	Course.findOne({
		_id: req.params.id
	}).exec(function (err, course) {
		if (err) {
			res.send("error occured");
		} else {
			console.log(course);
			res.json(course);
		}
	});
});

router.post("/add", function (req, res) {

	// NOTE: instructor ID and students should be valid ObjectIDs in the database
	const { name, type, instructorID, students, time, repeating } = req.body;
	var newCourse = new Course({
		name, type, instructorID, students, time, repeating: !!repeating
	});

	newCourse.save(function (err, course) {
		if (err) {
			res.status(400).send(err.message)
		} else {
			console.log(course);
			res.status(201).send(course);
		}
	});
});

// FIX update all fields which have been provided => like if name is provided update name
// easy way to do this
// get course with matching id using find and not update
// then for each property do 
// course.name = req.body?.name || course.name; => this basically checks if body has a name property, if yes => set it to that otherwise keep the same;
router.put("/course/:id", function (req, res) {
	let params = {
		name: req.body.name,
		type: req.body.type,
		students: req.body.students,
		repeating: !!req.body.repeating,
		time: req.body.time,
		instructorID: req.body.instructorID
	};

	for (let prop in params) if (!params[prop]) delete params[prop];
	Course.findOneAndUpdate({ _id: req.params.id }, params, { upsert: true },

		function (err, newCourse) {
			if (err) {
				res.status(400).send(err.message);
			} else {
				console.log(newCourse);
				res.status(200).send(newCourse);
			}
		}

	)
})

router.delete("/course/:id", function (req, res) {
	Course.findOneAndDelete({
		_id: req.params.id
	}, function (err, course) {
		if (err) {
			res.send(err.message);
		} else {
			console.log(course);
			res.status(200).send(course);
		}
	})
});
module.exports = router;