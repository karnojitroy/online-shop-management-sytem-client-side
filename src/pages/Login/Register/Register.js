import { Alert } from "@mui/material";
import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Navigation from "../../Shared/Navigation/Navigation";

const style = {
	width: "500px"
};
const alertStyle = {
	justifyContent: "center",
	marginLeft: "auto",
	marginRight: "auto"
};

const Register = () => {
	const [registerData, setRegisterData] = useState({});
	const { user, registerUser, isLoading, authError } = useAuth();

	const handleOnBlur = (e) => {
		const field = e.target.name;
		const value = e.target.value;
		const newRegisterData = { ...registerData };
		newRegisterData[field] = value;
		setRegisterData(newRegisterData);
		// console.log(newRegisterData);
	};

	//  handle Register Submit
	const handleRegisterSubmit = (e) => {
		if (registerData.password1 !== registerData.password2) {
			alert("password did not match");
			return;
		}

		registerUser(
			registerData.email,
			registerData.password1,
			registerData.name,
			registerData.phone,
			registerData.address,
			registerData.city,
			registerData.country
		);
		e.preventDefault();
	};

	return (
		<div>
			<Navigation></Navigation>
			<div className="container">
				<p className="mt-5">
					<b>Register</b>
				</p>

				{/* success and error alert */}
				{user?.email && (
					<Alert severity="success" style={alertStyle}>
						Account created successfully! & You are logged
					</Alert>
				)}
				{authError && (
					<Alert severity="error" style={alertStyle}>
						{authError}
					</Alert>
				)}

				<br />
				{/* register form */}
				{!isLoading && (
					<form onSubmit={handleRegisterSubmit}>
						<input
							required
							name="name"
							onBlur={handleOnBlur}
							placeholder="Name*"
							style={style}
						/>
						<br /> <br />
						<input
							type="email"
							required
							name="email"
							onBlur={handleOnBlur}
							placeholder="Email*"
							style={style}
						/>
						<br /> <br />
						<input
							type="number"
							required
							name="phone"
							onBlur={handleOnBlur}
							placeholder="Phone*"
							style={style}
						/>
						<br /> <br />
						<textarea
							type="text"
							required
							name="address"
							onBlur={handleOnBlur}
							placeholder="Address*"
							style={style}
						/>
						<br /> <br />
						<input
							type="text"
							required
							name="city"
							onBlur={handleOnBlur}
							placeholder="City*"
							style={style}
						/>
						<br /> <br />
						<input
							type="text"
							required
							name="country"
							onBlur={handleOnBlur}
							placeholder="Country*"
							style={style}
						/>
						<br /> <br />
						<input
							type="password"
							required
							name="password1"
							onBlur={handleOnBlur}
							placeholder="Password*"
							style={style}
						/>
						<br /> <br />
						<input
							type="password"
							required
							name="password2"
							onBlur={handleOnBlur}
							placeholder="Re-type Password*"
							style={style}
						/>
						<br /> <br />
						<button type="submit" className="btn btn-primary" style={style}>
							Register
						</button>
					</form>
				)}
				{/* Spinner */}
				{isLoading && (
					<Spinner className="my-5" animation="border" variant="success" />
				)}

				<p className="mt-3">
					<b>
						Already have an account?
						<NavLink to="/login" className="text-decoration-none">
							{" "}
							Login Now
						</NavLink>
					</b>{" "}
				</p>
			</div>
		</div>
	);
};

export default Register;
