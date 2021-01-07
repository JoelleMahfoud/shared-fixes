import React from 'react';
import { Link } from 'react-router-dom';

class Hero extends React.Component {
	render() {
		return (
			<div>
				<>
					<section className="hero-banner position-relative custom-pt-1 custom-pb-2 bg-dark">
						<div className="container">
							<div className="row text-white text-center z-index-1">
								<div className="col">
									<h1 className="text-white">{this.props.mpage}</h1>
									<nav aria-label="breadcrumb">
										<ol className="breadcrumb justify-content-center bg-transparent p-0 m-0">
											<li className="breadcrumb-item"><Link className="text-white" to="#">{this.props.sec1} </Link>
											</li>
											<li className="breadcrumb-item">{this.props.sec2}</li>
											<li className="breadcrumb-item active text-primary" aria-current="page">{this.props.sec3}</li>
										</ol>
									</nav>
								</div>
							</div>
							{/* / .row */}
						</div>
						{/* / .container */}
						<div className="shape-1 bottom">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
								<path fill="#fff" fillOpacity={1} d="M0,288L48,288C96,288,192,288,288,266.7C384,245,480,203,576,208C672,213,768,267,864,245.3C960,224,1056,128,1152,96C1248,64,1344,96,1392,112L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
							</svg>
						</div>
					</section>
				</>
			</div>
		);
	}
}

export default Hero;
