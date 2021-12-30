import React, { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";
import swal from "sweetalert";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 600,
	bgcolor: "background.paper",
	borderRadius: 2,
	boxShadow: 24,
	py: 2,
	px: 4
};
const UpdateCustomerProfileModal = ({
	customerEmail,
	openCustomerUpdateModal,
	handleCloseCustomerUpdateModal
}) => {
	const [customerInfo, setCustomernfo] = useState({});
	useEffect(() => {
		const url = `http://localhost:5000/users/userEmail/${customerEmail}`;
		fetch(url)
			.then((res) => res.json())
			.then((data) => setCustomernfo(data));
	}, [customerEmail]);

	const handleOnChange = (e) => {
		const field = e.target.name;
		const value = e.target.value;
		const updateInfo = { ...customerInfo };
		updateInfo[field] = value;
		setCustomernfo(updateInfo);
	};

	const handleUpdateProductSubmit = (e) => {
		// send to servers
		const url = `http://localhost:5000/users/${customerEmail}`;
		fetch(url, {
			method: "PUT",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify(customerInfo)
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.modifiedCount > 0) {
					swal("Update Successful", "Please reload!", "success");
					handleCloseCustomerUpdateModal();
				}
			});
		e.preventDefault();
	};
	return (
		<Modal
			aria-labelledby="transition-modal-title"
			aria-describedby="transition-modal-description"
			open={openCustomerUpdateModal}
			onClose={handleCloseCustomerUpdateModal}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500
			}}
		>
			<Fade in={openCustomerUpdateModal}>
				<Box sx={style}>
					<Typography
						variant="h6"
						sx={{ color: "info.main", textAlign: "center" }}
						display="block"
						gutterBottom
					>
						Update Account Information
					</Typography>
					<form onSubmit={handleUpdateProductSubmit}>
						<TextField
							sx={{ width: "100%", my: 1 }}
							id="outlined-size-small"
							label="Name"
							name="displayName"
							value={customerInfo?.displayName || ""}
							onChange={handleOnChange}
							size="small"
						/>
						<TextField
							sx={{ width: "100%", my: 1 }}
							id="outlined-size-small"
							name="email"
							label="Email"
							value={customerInfo?.email || ""}
							onChange={handleOnChange}
							size="small"
						/>
						<TextField
							sx={{ width: "100%", my: 1 }}
							id="outlined-size-small"
							name="phoneNumber"
							label="Phone"
							value={customerInfo?.phoneNumber || ""}
							onChange={handleOnChange}
							size="small"
						/>
						<TextField
							sx={{ width: "100%", my: 1 }}
							id="outlined-size-small"
							name="address"
							label="Address"
							value={customerInfo?.address || ""}
							onChange={handleOnChange}
							size="small"
						/>
						<TextField
							sx={{ width: "100%", my: 1 }}
							id="outlined-size-small"
							name="city"
							label="City"
							value={customerInfo?.city || ""}
							onChange={handleOnChange}
							size="small"
						/>
						<TextField
							sx={{ width: "100%", my: 1 }}
							id="outlined-size-small"
							name="country"
							label="County"
							value={customerInfo?.country || ""}
							onChange={handleOnChange}
							size="small"
						/>

						<br />
						<Button
							variant="contained"
							type="submit"
							sx={{ alignItems: "right" }}
						>
							Update
						</Button>
					</form>
				</Box>
			</Fade>
		</Modal>
	);
};

export default UpdateCustomerProfileModal;
