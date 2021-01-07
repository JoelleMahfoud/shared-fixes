import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/General/Hero';
import Navbar from '../components/General/Navbar';

import '../assets/css/style.css'
import '../assets/css/theme-plugin.css'
import '../assets/css/theme.min.css'

import axios from "axios";

class SignUp extends Component {

	initialErrors = {
		nameError: "",
		usernameError: "",
		passwordError: "",
		emailError: "",
		confirmPasswordError: "",
		checkBoxError: "",
		dateOfBirthError: ""
	}

	initalState = {
		name: "",
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
		country: "",
		countryValue: "",
		phone: "",
		dateOfBirth: "",
		checkbox: false,
		errors: this.initialErrors
	}

	constructor(props) {
		super(props);
		this.state = this.initalState;

		this.onChange = this.onChange.bind(this);
		this.onChangeCountry = this.onChangeCountry.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.validateInputs = this.validateInputs.bind(this);
	}



	onChange(e) {
		const isCheckbox = e.target.type === "checkbox";
		this.setState(prevState => ({
			...prevState,
			[e.target.name]: isCheckbox ? e.target.checked : e.target.value
		}));
	};


	onChangeCountry(e) {
		const { options, selectedIndex, value } = e.target;
		this.setState(prevState => ({
			...prevState,
			country: options[selectedIndex].innerText,
			countryValue: value
		}));
	};



	validateInputs() {
		const emailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;

		const { name, email, password, confirmPassword, dateOfBirth, checkbox } = this.state;
		const errors = { ...this.initialErrors };


		// name must be full name => have a space
		if (!name.trim().includes(" "))
			errors.nameError = "Please enter your full name";


		if (!email.match(emailRegex))
			errors.emailError = "Please enter a valid email address";

		if (password.length < 8)
			errors.passwordError = "Password must be at least 8 characters"

		if (password !== confirmPassword)
			errors.confirmPasswordError = "Passwords don't match";

		if (!checkbox)
			errors.checkBoxError = "Please agree to the terms of use and privacy policy"

		// check if at least 5 years old
		if (new Date().getFullYear() - parseInt(dateOfBirth.split('-')[0]) < 5)
			errors.dateOfBirthError = "You must be at least 5 years old"

		this.setState(prevState => ({
			...prevState,
			errors: errors
		}));

		// check if there are any errors => any of the errors is not empty
		for (let err in errors)
			if (errors[err]) return false;

		return true;
	}




	onSubmit(e) {
		e.preventDefault();
		const isValid = this.validateInputs();
		console.log(isValid);
		if (isValid) {
			const newData = {
				email: this.state.email,
				password: this.state.password,
				name: this.state.name,
				country: this.state.country,
				dateOfBirth: this.state.dateOfBirth.toLocaleString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' }),
				username: this.state.username,
				phone: this.state.phone,
				confirmpassword: this.state.confirmPassword
			}


			axios.post('/api/users', newData)
				.then(res => {
					axios.post('/api/auth/signin', newData)
						.then(res => {
							// set token in localStorage
							localStorage.setItem('ijam-user-token', res.data);
							this.setState(this.initalState);

							// ADD redirect user to user dashboard
						})
						.catch(err => { console.log(err); });
				})
				.catch(err => {
					// show interface errors here
					let error = err.response.data.message;
					const errors = { ...this.state.errors };

					if (error.toLowerCase().includes("email"))
						errors.emailError = error;
					else if (error.toLowerCase().includes("username"))
						errors.usernameError = error;

					this.setState(prevState => ({ ...prevState, errors: errors }));
				});
		}



	}

	render() {
		const { name, username, email, phone, password, confirmPassword, countryValue, dateOfBirth, checkbox, errors } = this.state;

		return (
			<div>
				<Navbar />
				{/* page wrapper start */}
				<div className="page-wrapper">

					{/*hero section start*/}
					<div>
						<Hero mpage="Sign Up" sec1="Home" sec2="Account" sec3="Sign Up" />
					</div>

					{/*hero section end*/}

					<div className="page-content">
						{/*Signup start*/}
						<section className="register">
							<div className="container">
								<div className="row justify-content-center text-center">
									<div className="col-lg-8 col-md-12">
										<div className="mb-5">
											<h2><span className="font-w-4">Simple And</span> Easy To Sign Up</h2>
											<p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum tenetur architecto cupiditate?</p>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-lg-8 col-md-10 ml-auto mr-auto">
										<div className="register-form text-center">
											<form onSubmit={this.onSubmit}>
												<div className="messages" />
												<div className="row">
													<div className="col-md-6">
														<div className="form-group">
															<input id="form_name" value={name} onChange={this.onChange} type="text" name="name" className="form-control" placeholder="Full name" required="required" data-error="Full name is required." />
															<div className="help-block with-errors">
																{errors.nameError}
															</div>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<input id="form_username" value={username} onChange={this.onChange} type="text" name="username" className="form-control" placeholder="Username" required="required" data-error="Username is required." />
															<div className="help-block with-errors">
																{errors.usernameError}
															</div>
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-md-6">
														<div className="form-group">
															<input id="form_email" value={email} onChange={this.onChange} type="text" name="email" className="form-control" placeholder="Email" required="required" data-error="Valid email is required." />
															<div className="help-block with-errors">
																{errors.emailError} </div>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<input id="form_phone" type="tel" value={phone} onChange={this.onChange} name="phone" className="form-control" placeholder="Phone" data-error="Phone is required" />
															<div className="help-block with-errors">
															</div>
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-md-6">
														<div className="form-group">
															<input id="form_password" value={password} onChange={this.onChange} type="password" name="password" className="form-control" placeholder="Password" required="required" data-error="password is required." />
															<div className="help-block with-errors">
																{errors.passwordError}
															</div>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<input id="form_password1" value={confirmPassword} onChange={this.onChange} type="password" name="confirmPassword" className="form-control" placeholder="Confirm Password" required="required" data-error="Confirm Password is required." />
															<div className="help-block with-errors">
																{errors.confirmPasswordError}
															</div>
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-md-6">
														<div className="form-group">
															<select className="form-control" value={countryValue} onChange={this.onChangeCountry} name="country" >
																<option value="Country">Select Country...</option>
																<option value="AF">Afghanistan</option>
																<option value="AL">Albania</option>
																<option value="DZ">Algeria</option>
																<option value="AS">American Samoa</option>
																<option value="AD">Andorra</option>
																<option value="AG">Angola</option>
																<option value="AI">Anguilla</option>
																<option value="AG">Antigua &amp; Barbuda</option>
																<option value="AR">Argentina</option>
																<option value="AA">Armenia</option>
																<option value="AW">Aruba</option>
																<option value="AU">Australia</option>
																<option value="AT">Austria</option>
																<option value="AZ">Azerbaijan</option>
																<option value="BS">Bahamas</option>
																<option value="BH">Bahrain</option>
																<option value="BD">Bangladesh</option>
																<option value="BB">Barbados</option>
																<option value="BY">Belarus</option>
																<option value="BE">Belgium</option>
																<option value="BZ">Belize</option>
																<option value="BJ">Benin</option>
																<option value="BM">Bermuda</option>
																<option value="BT">Bhutan</option>
																<option value="BO">Bolivia</option>
																<option value="BL">Bonaire</option>
																<option value="BA">Bosnia &amp; Herzegovina</option>
																<option value="BW">Botswana</option>
																<option value="BR">Brazil</option>
																<option value="BC">British Indian Ocean Ter</option>
																<option value="BN">Brunei</option>
																<option value="BG">Bulgaria</option>
																<option value="BF">Burkina Faso</option>
																<option value="BI">Burundi</option>
																<option value="KH">Cambodia</option>
																<option value="CM">Cameroon</option>
																<option value="CA">Canada</option>
																<option value="IC">Canary Islands</option>
																<option value="CV">Cape Verde</option>
																<option value="KY">Cayman Islands</option>
																<option value="CF">Central African Republic</option>
																<option value="TD">Chad</option>
																<option value="CD">Channel Islands</option>
																<option value="CL">Chile</option>
																<option value="CN">China</option>
																<option value="CI">Christmas Island</option>
																<option value="CS">Cocos Island</option>
																<option value="CO">Colombia</option>
																<option value="CC">Comoros</option>
																<option value="CG">Congo</option>
																<option value="CK">Cook Islands</option>
																<option value="CR">Costa Rica</option>
																<option value="CT">Cote D'Ivoire</option>
																<option value="HR">Croatia</option>
																<option value="CU">Cuba</option>
																<option value="CB">Curacao</option>
																<option value="CY">Cyprus</option>
																<option value="CZ">Czech Republic</option>
																<option value="DK">Denmark</option>
																<option value="DJ">Djibouti</option>
																<option value="DM">Dominica</option>
																<option value="DO">Dominican Republic</option>
																<option value="TM">East Timor</option>
																<option value="EC">Ecuador</option>
																<option value="EG">Egypt</option>
																<option value="SV">El Salvador</option>
																<option value="GQ">Equatorial Guinea</option>
																<option value="ER">Eritrea</option>
																<option value="EE">Estonia</option>
																<option value="ET">Ethiopia</option>
																<option value="FA">Falkland Islands</option>
																<option value="FO">Faroe Islands</option>
																<option value="FJ">Fiji</option>
																<option value="FI">Finland</option>
																<option value="FR">France</option>
																<option value="GF">French Guiana</option>
																<option value="PF">French Polynesia</option>
																<option value="FS">French Southern Ter</option>
																<option value="GA">Gabon</option>
																<option value="GM">Gambia</option>
																<option value="GE">Georgia</option>
																<option value="DE">Germany</option>
																<option value="GH">Ghana</option>
																<option value="GI">Gibraltar</option>
																<option value="GB">Great Britain</option>
																<option value="GR">Greece</option>
																<option value="GL">Greenland</option>
																<option value="GD">Grenada</option>
																<option value="GP">Guadeloupe</option>
																<option value="GU">Guam</option>
																<option value="GT">Guatemala</option>
																<option value="GN">Guinea</option>
																<option value="GY">Guyana</option>
																<option value="HT">Haiti</option>
																<option value="HW">Hawaii</option>
																<option value="HN">Honduras</option>
																<option value="HK">Hong Kong</option>
																<option value="HU">Hungary</option>
																<option value="IS">Iceland</option>
																<option value="IN">India</option>
																<option value="ID">Indonesia</option>
																<option value="IA">Iran</option>
																<option value="IQ">Iraq</option>
																<option value="IR">Ireland</option>
																<option value="IM">Isle of Man</option>
																<option value="IT">Italy</option>
																<option value="JM">Jamaica</option>
																<option value="JP">Japan</option>
																<option value="JO">Jordan</option>
																<option value="KZ">Kazakhstan</option>
																<option value="KE">Kenya</option>
																<option value="KI">Kiribati</option>
																<option value="NK">Korea North</option>
																<option value="KS">Korea South</option>
																<option value="KW">Kuwait</option>
																<option value="KG">Kyrgyzstan</option>
																<option value="LA">Laos</option>
																<option value="LV">Latvia</option>
																<option value="LB">Lebanon</option>
																<option value="LS">Lesotho</option>
																<option value="LR">Liberia</option>
																<option value="LY">Libya</option>
																<option value="LI">Liechtenstein</option>
																<option value="LT">Lithuania</option>
																<option value="LU">Luxembourg</option>
																<option value="MO">Macau</option>
																<option value="MK">Macedonia</option>
																<option value="MG">Madagascar</option>
																<option value="MY">Malaysia</option>
																<option value="MW">Malawi</option>
																<option value="MV">Maldives</option>
																<option value="ML">Mali</option>
																<option value="MT">Malta</option>
																<option value="MH">Marshall Islands</option>
																<option value="MQ">Martinique</option>
																<option value="MR">Mauritania</option>
																<option value="MU">Mauritius</option>
																<option value="ME">Mayotte</option>
																<option value="MX">Mexico</option>
																<option value="MI">Midway Islands</option>
																<option value="MD">Moldova</option>
																<option value="MC">Monaco</option>
																<option value="MN">Mongolia</option>
																<option value="MS">Montserrat</option>
																<option value="MA">Morocco</option>
																<option value="MZ">Mozambique</option>
																<option value="MM">Myanmar</option>
																<option value="NA">Nambia</option>
																<option value="NU">Nauru</option>
																<option value="NP">Nepal</option>
																<option value="AN">Netherland Antilles</option>
																<option value="NL">Netherlands (Holland, Europe)</option>
																<option value="NV">Nevis</option>
																<option value="NC">New Caledonia</option>
																<option value="NZ">New Zealand</option>
																<option value="NI">Nicaragua</option>
																<option value="NE">Niger</option>
																<option value="NG">Nigeria</option>
																<option value="NW">Niue</option>
																<option value="NF">Norfolk Island</option>
																<option value="NO">Norway</option>
																<option value="OM">Oman</option>
																<option value="PK">Pakistan</option>
																<option value="PW">Palau Island</option>
																<option value="PS">Palestine</option>
																<option value="PA">Panama</option>
																<option value="PG">Papua New Guinea</option>
																<option value="PY">Paraguay</option>
																<option value="PE">Peru</option>
																<option value="PH">Philippines</option>
																<option value="PO">Pitcairn Island</option>
																<option value="PL">Poland</option>
																<option value="PT">Portugal</option>
																<option value="PR">Puerto Rico</option>
																<option value="QA">Qatar</option>
																<option value="ME">Republic of Montenegro</option>
																<option value="RS">Republic of Serbia</option>
																<option value="RE">Reunion</option>
																<option value="RO">Romania</option>
																<option value="RU">Russia</option>
																<option value="RW">Rwanda</option>
																<option value="NT">St Barthelemy</option>
																<option value="EU">St Eustatius</option>
																<option value="HE">St Helena</option>
																<option value="KN">St Kitts-Nevis</option>
																<option value="LC">St Lucia</option>
																<option value="MB">St Maarten</option>
																<option value="PM">St Pierre &amp; Miquelon</option>
																<option value="VC">St Vincent &amp; Grenadines</option>
																<option value="SP">Saipan</option>
																<option value="SO">Samoa</option>
																<option value="AS">Samoa American</option>
																<option value="SM">San Marino</option>
																<option value="ST">Sao Tome &amp; Principe</option>
																<option value="SA">Saudi Arabia</option>
																<option value="SN">Senegal</option>
																<option value="RS">Serbia</option>
																<option value="SC">Seychelles</option>
																<option value="SL">Sierra Leone</option>
																<option value="SG">Singapore</option>
																<option value="SK">Slovakia</option>
																<option value="SI">Slovenia</option>
																<option value="SB">Solomon Islands</option>
																<option value="OI">Somalia</option>
																<option value="ZA">South Africa</option>
																<option value="ES">Spain</option>
																<option value="LK">Sri Lanka</option>
																<option value="SD">Sudan</option>
																<option value="SR">Suriname</option>
																<option value="SZ">Swaziland</option>
																<option value="SE">Sweden</option>
																<option value="CH">Switzerland</option>
																<option value="SY">Syria</option>
																<option value="TA">Tahiti</option>
																<option value="TW">Taiwan</option>
																<option value="TJ">Tajikistan</option>
																<option value="TZ">Tanzania</option>
																<option value="TH">Thailand</option>
																<option value="TG">Togo</option>
																<option value="TK">Tokelau</option>
																<option value="TO">Tonga</option>
																<option value="TT">Trinidad &amp; Tobago</option>
																<option value="TN">Tunisia</option>
																<option value="TR">Turkey</option>
																<option value="TU">Turkmenistan</option>
																<option value="TC">Turks &amp; Caicos Is</option>
																<option value="TV">Tuvalu</option>
																<option value="UG">Uganda</option>
																<option value="UA">Ukraine</option>
																<option value="AE">United Arab Emirates</option>
																<option value="GB">United Kingdom</option>
																<option value="US">United States of America</option>
																<option value="UY">Uruguay</option>
																<option value="UZ">Uzbekistan</option>
																<option value="VU">Vanuatu</option>
																<option value="VS">Vatican City State</option>
																<option value="VE">Venezuela</option>
																<option value="VN">Vietnam</option>
																<option value="VB">Virgin Islands (Brit)</option>
																<option value="VA">Virgin Islands (USA)</option>
																<option value="WK">Wake Island</option>
																<option value="WF">Wallis &amp; Futana Is</option>
																<option value="YE">Yemen</option>
																<option value="ZR">Zaire</option>
																<option value="ZM">Zambia</option>
																<option value="ZW">Zimbabwe</option>
															</select>
															<div className="help-block with-errors"></div>
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<input type="date" id="birthday" value={dateOfBirth} onChange={this.onChange} placeholder="dd/mm/yy" name="dateOfBirth" required="required" data-error="Date of Birth is required" className="form-control" />
															<div className="help-block with-errors">
																{errors.dateOfBirthError}
															</div>
														</div>
													</div>
												</div>
												<div className="row mt-4">
													<div className="col-md-12">
														<div className="remember-checkbox clearfix mb-4">
															<div className="form-check">
																<input type="checkbox" name="checkbox" className="form-check-input float-none" id="customCheck1" onChange={this.onChange} checked={checkbox} value={checkbox} />
																<label className="form-check-label" htmlFor="customCheck1">I agree to the terms of use and privacy policy</label>
																<div className="help-block with-errors">{errors.checkBoxError}
																</div>

															</div>
														</div>
													</div>
												</div>

												<div className="row">
													<div className="col">
														{/*  <Link to="#" className="btn btn-primary">Create Account</Link> */}
														<input type="submit" value="Create Account" className="btn btn-primary" />
														<span className="mt-4 d-block">Have An Account ? <Link to='/sign-in' >Sign In!</Link></span>
													</div>
												</div>

											</form>
										</div>
									</div>
								</div>
							</div>
						</section>

						{/*Signup end*/}
					</div>
				</div>

				<div className="scroll-top"><Link className="smoothscroll" to="#top">Scroll Top</Link></div>
			</div>
		);
	}
}
export default SignUp;