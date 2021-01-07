import React from 'react';
import { Link } from 'react-router-dom';

import '../assets/css/style.css'
import '../assets/css/theme-plugin.css';
import '../assets/css/theme.min.css';

class error extends React.Component {
	render() {
		return (
			<div>
				<>
					<div className="page-wrapper">
						{/*body content start*/}
						<div className="page-content">
							{/*404 start*/}
							<section className="fullscreen-banner p-0">
								<div className="container h-100">
									<div className="row h-100">
										<div className="col-12 text-center h-100 d-flex align-items-center">
											<div className="w-100"><img className="img-fluid d-inline mb-5" src="assets/images/404.png" alt="error 404" />
												<h2>Oops! Page Not Found</h2>
												<h6>You’re either misspelling the URL
                  or requesting a page that's no longer here.</h6>
												<Link className="btn btn-primary" to="index.html">Back To Home Page</Link>
											</div>
										</div>
									</div>
								</div>
							</section>
							{/*404 end*/}
						</div>
						{/*body content end*/}
					</div>
					{/* page wrapper end */}
					{/*back-to-top start*/}
					<div className="scroll-top"><Link className="smoothscroll" to="#top">Scroll Top</Link></div>

				</>

			</div>
		);
	}
}
export default error;