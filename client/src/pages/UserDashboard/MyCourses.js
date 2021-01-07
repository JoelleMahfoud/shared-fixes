import React from 'react'
import Cards from '../../components/Course/Cards'
import SideBar from '../../components/General/Sidebar'
function MyCourses() {
	return (
		<div>
			<SideBar />
			<h3 className="h22">My Courses</h3>
			<Cards />
			<Cards />
			<Cards />
		</div>

	)
}

export default MyCourses
