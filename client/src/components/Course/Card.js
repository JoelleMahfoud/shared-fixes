import React from 'react';
import { Link } from 'react-router-dom';
import "../../styles/card-style.css";

export default function Card(props) {
	return (
		<div className="card text-center">
			<div className="overflow">
				<img src={props.imgsrc} className="card-img-top" alt="course thumbnail" />
			</div>
			<div className="card-body text-dark">
				<h4 className="Card-title">{props.title}</h4>
				<p className="card-text text-secondary">
					{props.par}
				</p>

				<Link to="/Course/CourseInfoDesc" className="btn btn-outline-success">Go Anywhere</Link>
			</div>
		</div>
	)
}

