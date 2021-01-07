import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/General/Hero';
import Navbar from '../components/General/Navbar';

import '../assets/css/style.css'
import '../assets/css/theme-plugin.css'
import '../assets/css/theme.min.css'

import imgLogin from "../assets/img/login.png";

import axios from "axios";



class SignIn extends Component {

	initialErrors = {
		emailError: "",
		passwordError: ""
	};

	initialState = {
		password: "",
		email: "",
		isCheckedRemember: false,
		errors: this.initialErrors
	};

	constructor(props) {
		super(props);
		this.state = this.initialState;

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		const isCheckbox = e.target.type === "checkbox";
		this.setState(prevState => ({
			...prevState,
			[e.target.name]: isCheckbox ? e.target.checked : e.target.value
		}));
	};

	onSubmit(e) {
		e.preventDefault();

		const { email, password, isCheckedRemember } = this.state;

		const newData = { email, password };

		axios.post('/api/auth/signin', newData)
			.then(res => {

				if (isCheckedRemember)
					localStorage.setItem('ijam-user-token', res.data);
				else
					sessionStorage.setItem('ijam-user-token', res.data);

				this.setState(this.initialState);

				// TODO redirect to dashboard here
			})
			.catch(err => {
				// show interface errors here
				let { error } = err.response.data;
				console.log(error);
				const errors = { ...this.initialErrors };

				if (error.toLowerCase().includes("user"))
					errors.emailError = error;
				else if (error.toLowerCase().includes("password"))
					errors.passwordError = error;

				this.setState(prevState => ({ ...prevState, errors: errors }));
			})
	}

	render() {
		const { email, password, isCheckedRemember, errors } = this.state;
		return (
			<div>
				<Navbar />
				{/* page wrapper start */}
				<div className="page-wrapper">

					{/*hero section start*/}
					<div>
						<Hero mpage="Login" sec1="Home" sec2="Account" sec3="Login" />
					</div>

					{/*hero section end*/}

					<div className="page-content">
						{/*login start*/}
						<section>
							<div className="container">
								<div className="row align-items-center">
									<div className="col-lg-7 col-12">
										<img className="img-fluid" src={imgLogin} alt="login" />
									</div>
									<div className="col-lg-5 col-12">
										<div>
											<h2 className="mb-3">Sign In</h2>
											<form onSubmit={this.onSubmit}>
												<div className="messages" />
												<div className="form-group">
													<input id="form_name" value={email} onChange={this.onChange} type="text" name="email" className="form-control" placeholder="Email" required="required" data-error="Email is required." />
													<div className="help-block with-errors">{errors.emailError}</div>
												</div>
												<div className="form-group">
													<input id="form_password" value={password} onChange={this.onChange} type="password" name="password" className="form-control" placeholder="Password" required="required" data-error="password is required." />
													<div className="help-block with-errors">{errors.passwordError}</div>
												</div>
												<div className="form-group mt-4 mb-5">
													<div className="remember-checkbox d-flex align-items-center justify-content-between">
														<div className="form-check">
															<input className="form-check-input" type="checkbox" name="isCheckedRemember" value={isCheckedRemember} checked={isCheckedRemember} onChange={this.onChange} id="check1" />
															<label className="form-check-label" htmlFor="check1">Remember me</label>
														</div>
														<Link to="/forgot-password" className="btn-link">Forgot password?</Link>
													</div>
												</div>
												<input type="submit" value="Login Now" className="btn btn-primary" />
											</form>
											<div className="d-flex align-items-center mt-4"> <span className="text-muted mr-1">Don't have an account?</span>
												<Link to="/sign-up" className="btn-link">Sign Up</Link>

											</div>
										</div>
									</div>
								</div>
							</div>
						</section>
						{/*login end*/}
					</div>
				</div>

				<div className="scroll-top"><Link className="smoothscroll" to="#top">Scroll Top</Link></div>
			</div>
		);
	}
}
export default SignIn;