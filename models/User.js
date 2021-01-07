const mongoose = require("mongoose");

const User = mongoose.model(
	"User",

new mongoose.Schema({
	name:{
      type: String,
      required: true,
    },  
	username: {
      type: String,
      required: true,
    },
	email:{ 
      type: String,
      required: true,
    },
	phone:{ 
      type: String,
      required: true,
    },
	country:{
      type: String,
      required: true,
    },
	password: { 
      type: String,
      required: true,
    },
	dateOfBirth:{ 
      type: Date,
      required: true,
    },
    aboutMe:{
      type:String,
      required:false
    },
 	enrolledCourses: { 
      type: Array,
      required: false,
    },
	createdCourses: { 
      type: Array,
      required: false,
    },
  })
);


module.exports = User;
