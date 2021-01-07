import React from 'react'
import Cards from '../../components/Course/Cards'
import SideBar from '../../components/General/Sidebar'

export default function EnrolledCourses() {
	return (
		<div>
			<SideBar />
			<h3 className="h22">Courses Enrolled</h3>
			<Cards />
			<Cards />
			<Cards />
		</div>

	)
}
