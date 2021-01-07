import React from 'react';
import { Link } from 'react-router-dom';

import '../../assets/css/theme.min.css'
import '../../assets/css/theme-plugin.css';
import '../../assets/css/style.css'

class Navbar extends React.Component {

	render() {
		return (
			<div>
				<header className="site-header">
					<div id="header-wrap">
						<div className="container">
							<div className="row">
								{/*menu start*/}
								<div className="col">
									<nav className="navbar navbar-expand-lg navbar-light">
										<Link to="/" className="navbar-brand logo text-primary mb-0 font-w-7">I<span className="text-dark font-w-4">Jam</span></Link>
										<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-expanded="false" aria-label="Toggle navigation"> <span className="navbar-toggler-icon" /></button>
										<div className="collapse navbar-collapse" id="navbarNav">
											<ul className="navbar-nav ml-auto mr-auto">
												<li className="nav-item"> <Link className="nav-link" to="/">Home</Link>
												</li>
												<li className="nav-item"> <Link className="nav-link" to="/#services">Services</Link>
												</li>
												<li className="nav-item"> <Link className="nav-link" to="/#process">Process</Link>
												</li>
												<li className="nav-item"> <Link className="nav-link" to="/#system">System</Link>
												</li>
												<li className="nav-item"> <Link className="nav-link" to="/#contact">Contact Us</Link>
												</li>
											</ul>
										</div>
										<div className="d-none d-sm-flex align-items-center w-25 justify-content-end">
											<Link to="/sign-in" className="btn btn-primary p-2">login</Link>

											<Link to="/sign-up" className="btn btn-primary ml-3 p-2">Sign Up</Link>

										</div>
									</nav>
								</div>
								{/*menu end*/}
							</div>
						</div>
					</div>
				</header>
			</div>
		);
	}
}

export default Navbar;
