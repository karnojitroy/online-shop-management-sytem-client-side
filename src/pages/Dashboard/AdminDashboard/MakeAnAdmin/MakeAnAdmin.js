import { Divider, TextField, Button, Alert } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

// handle make admin
const MakeAnAdmin = () => {
	const [success, setSuccess] = useState(false);

	const { register, handleSubmit, reset } = useForm();
	const onSubmit = (data) => {
		fetch("https://floating-ocean-21128.herokuapp.com/users/admin", {
			method: "PUT",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify(data)
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.modifiedCount) {
					setSuccess(true);
					reset();
				}
			});
	};
	return (
		<div>
			<h2>Make an Admin</h2>
			<Divider />
			{/* make admin input form*/}
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					label="Email"
					type="email"
					{...register("email", { required: true, min: 1 })}
					variant="standard"
					sx={{ width: "25%", mt: 5 }}
				/>
				<br />
				<Button type="submit" variant="contained" sx={{ mt: 3, width: "25%" }}>
					Make Admin
				</Button>
			</form>
			{success && <Alert severity="success">Made Admin Successful!</Alert>}
		</div>
	);
};

export default MakeAnAdmin;
