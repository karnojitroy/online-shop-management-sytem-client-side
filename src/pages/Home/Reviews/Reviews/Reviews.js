import Button from "@restart/ui/esm/Button";
import React from "react";
import { NavLink } from "react-router-dom";
import ReviewHome from "../ReviewHome/ReviewHome";
import "./Reviews.css";

const Reviews = () => {
	// this review component for home page
	return (
		<div id="review-bg">
			<div className="container review-min-height">
				<h2 className="pt-5">Customer's Reviews About Our Service</h2>
				<hr
					className="mx-auto"
					style={{ width: "50%", alignItems: "center", color: "black" }}
				/>

				<NavLink to="/review#review" className="text-decoration-none">
					<Button className="btn btn-outline-primary">Give Review</Button>{" "}
				</NavLink>
				<ReviewHome></ReviewHome>
			</div>
		</div>
	);
};

export default Reviews;
