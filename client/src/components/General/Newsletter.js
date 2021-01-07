import React from 'react';

import imgBg from "../../assets/img/bg/02.png";

class Newsletter extends React.Component {
	render() {
		return (
			<div>
				<>
					<section>
						<div className="container">
							<div className="row">
								<div className="col">
									<div className="bg-light bg-pos-l py-6 px-4 px-lg-6 text-center rounded" data-bg-img={imgBg}>
										<div className="mb-5">
											<h2><span className="font-w-4 d-block">Have any questions?</span> Contact Us</h2>
										</div>
										<div className="row justify-content-center">
											<div className="col-lg-9">
												<div className="subscribe-form text-center">
													<form id="mc-form" className="row mb-3">
														<div className="col-md">
															<input type="email" defaultValue="" name="EMAIL" className="email form-control border-0 shadow-sm rounded mt-3 mt-md-0" id="mc-email" placeholder="Email Address" required />
														</div>
														<div className="col-md-auto">
															<input className="btn btn-dark mt-3 mt-md-0" type="submit" name="submit" defaultValue="Submit" />
														</div>
													</form>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</>
			</div>
		);
	}
}

export default Newsletter;
