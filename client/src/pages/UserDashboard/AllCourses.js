import axios from 'axios';
import { post } from 'jquery';
import React from 'react'
import { Component } from 'react'
import { Redirect } from 'react-router-dom';
import Cards from '../../components/Course/Cards'
import Sidebar from '../../components/General/Sidebar'

class AllCourses extends Component {


	render(){		
	return (
		<div>
			<Sidebar />
			<h3 className="h22">All Courses</h3>
			<Cards />
			</div>	

		

	)
}
}


export default AllCourses
