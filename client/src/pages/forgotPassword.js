import React from 'react';
import Hero from '../components/General/Hero';
import { Link } from 'react-router-dom';

import '../assets/css/style.css'
import '../assets/css/theme-plugin.css';
import '../assets/css/theme.min.css';

class forgotP extends React.Component {
	render() {
		return (
			<div>
				<>
					{/* page wrapper start */}
					<div className="page-wrapper">

						{/*hero section start*/}
						<div>
							<Hero mpage="Forgot Password" sec1="Home" sec2="Account" sec3="Forgot Password" />
						</div>

						{/*hero section end*/}

						<div className="page-content">

							{/*forgot password start*/}
							<section>
								<div className="container">
									<div className="row align-items-center">
										<div className="col-lg-7 col-12">
											<img className="img-fluid" src="assets/fp.svg" alt="forgot password" />
										</div>
										<div className="col-lg-5 col-12">
											<div>
												<div className="row justify-content-center text-center">
													<div className="col-15">
														<div>
															<div className="mb-5 ">
																<h2>Forgot your password?</h2>
																<p>Enter your email to reset your password.</p>
															</div>
															<form id="contact-form" method="post" action="php/contact.php">
																<div className="messages" />
																<div className="form-group">
																	<input id="form_email" type="email" name="email" className="form-control" placeholder="Email" required="required" data-error="Valid email is required." />
																	<div className="help-block with-errors" />
																</div> <Link to="#" className="btn btn-primary btn-block">Forgot Now</Link>
															</form>
															<div className="mt-4"><Link to="/" class="link-title">Back to sign in</Link>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div></div></section>
							{/*forgot password end*/}



						</div>



					</div>

					<div className="scroll-top"><Link className="smoothscroll" to="#top">Scroll Top</Link></div>
				</>

			</div>
		);
	}
}
export default forgotP;