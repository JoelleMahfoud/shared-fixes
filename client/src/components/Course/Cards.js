import React from 'react';
import Card from './Card';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import img1 from '../../assets/img/dummyimg.png';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

// TODO Refactor to take courses as props and map them to Cards
class Cards extends React.Component {

	initialState = {
		courseID:"",
		name:"",
		type:"",
		instructorID:"",
		students:[],
		description:"",
		time:"",
		repeating: false,
		courses:'',
		redirect:""
	};


	componentDidMount = () => {
		this.getAllCourses();
		this.state = this.initialState;
	}

	displayCourse = (courses) => {
		if(!courses.length) return null;

		return courses.map((course, index) => (
			
			<a  onClick = {this.clickMe.bind(this,course)} >
			<div key={index} className="col-md-4"><Card imgsrc={img1} title= {course.name} par={course.type} />
			</div>
			</a>
			
			
			
			
		));
	}

	clickMe(item){
		alert("hello im clicked");
		console.log(item)
		this.setState({instructorID: item.instructorID});
		this.setState({courseID: item._id});
		this.setState({name: item.name});
		this.setState({time: item.time});
		this.setState({repeating: item.repeating});
		this.setState({type: item.type});
		this.setState({students: item.students});
		this.setState({redirect: "redirect"})
		
		  
		
	}




	getAllCourses = () => {
		axios.get('/api/Courses/') // the proxy i created is set to our local host
		.then((response) => {
			const data = response.data;
			this.setState({ courses: data,
				repeating: data.repeating
			                     })
			console.log("Data has been received");
			//console.log(this.state); /// Here is the fetched data
		})
		.catch(() => {
			alert('Error retreiveing Data')
		});
	}



	constructor(props) {
		super(props);
		this.state = this.initialState;
		this.getAllCourses = this.getAllCourses.bind(this);
		this.clickMe = this.clickMe.bind(this);
	}




	render() {
		if(this.state.redirect === "redirect"){
			return <Redirect to= {`/Course/CourseInfoDesc/${this.state.courseID}`} />
		}
		
		// return <Redirect to={`/Course/CourseInfoDesc/${this.courseID}`} />
		
		return (
			<div className="content">
				<div className="container-fluid d-flex justify-content-center">
					<div className="row">
					<div className="courses">
			{this.displayCourse(this.state.courses)}
						{/* /* <div className="col-md-4"><Card imgsrc={img1} title="Title" par="dummy text" /></div>
						<div className="col-md-4"><Card imgsrc={img1} title="Title" par="dummy text" /></div>
						<div className="col-md-4"><Card imgsrc={img1} title="Title" par="dummy text" /></div> */ }
					</div>
				</div>
			</div>
			</div>
		);
	}

}

export default Cards;
