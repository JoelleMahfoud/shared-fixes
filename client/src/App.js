import './App.css';
import SignIn from './pages/SignIn';
import Footer from './components/General/Footer';
import Newsletter from './components/General/Newsletter';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import forgotPage from './pages/forgotPassword';
import errorPage from './pages/404';
import SignUp from './pages/SignUp';
import LandingPage from './pages/landingPage';

import AllCourses from './pages/UserDashboard/AllCourses';
import EnrolledCourses from './pages/UserDashboard/EnrolledCourses';
import GiveACourse from './pages/UserDashboard/GiveACourse';
import MyCourses from './pages/UserDashboard/MyCourses';
import Profile from './pages/UserDashboard/Profile';
import CourseInfoSet from './pages/UserDashboard/CourseInfoSet';
import CourseInfoDesc from './pages/UserDashboard/CourseInfoDesc';


function App() {
	return (
		<div>
			<Router>
				<Switch>
					<Route exact path='/' component={LandingPage} />
					<Route exact path='/sign-in' component={SignIn} />
					<Route path='/sign-up' component={SignUp} />
					<Route path='/forgot-password' component={forgotPage} />

					{/* CHANGE Need to add param matching for /Course/ routes */}
					<Route exact path='/Courses' component={AllCourses} />
					<Route exact path='/Courses/Enrolled' component={EnrolledCourses} />
					<Route exact path='/Courses/Give' component={GiveACourse} />
					<Route exact path='/Courses/MyCourses' component={MyCourses} />
					<Route exact path='/Profile' component={Profile} />
					<Route exact path='/Course/CourseInfoDesc/:id?' component={CourseInfoDesc} />
					<Route exact path='/Course/CourseInfoSet' component={CourseInfoSet} />

					<Route path='*' component={errorPage} />
				</Switch>
				<Newsletter />
				<Footer />

			</Router>
		</div>

	);
}

export default App;
