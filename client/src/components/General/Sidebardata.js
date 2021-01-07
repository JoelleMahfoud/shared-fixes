import React from 'react';
import * as FaIcons from 'react-icons/fa';
export const SidebarData = [
	{
		title: 'All Courses',
		path: '/Courses',
		icon: <FaIcons.FaSearch />,
		cName: 'nav-text'
	},
	{
		title: 'Enrolled Courses',
		path: '/Courses/Enrolled',
		icon: <FaIcons.FaTh />,
		cName: 'nav-text'
	},
	{
		title: 'My Courses',
		path: '/Courses/MyCourses',
		icon: <FaIcons.FaVideo />,
		cName: 'nav-text'
	},
	{
		title: 'Give a Courses',
		path: '/Courses/Give',
		icon: <FaIcons.FaChalkboard />,
		cName: 'nav-text'
	},
	{
		title: 'Profile',
		path: '/Profile',
		icon: <FaIcons.FaUser />,
		cName: 'nav-text'
	},

]