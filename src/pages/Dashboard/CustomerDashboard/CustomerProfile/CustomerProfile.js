import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import UpdateCustomerProfileModal from "../UpdateCustomerProfileModal/UpdateCustomerProfileModal";
import "./CustomerProfile.css";

const CustomerProfile = () => {
	const [customerInfo, setCustomerInfo] = useState([]);

	const [openCustomerUpdateModal, setOpenCustomerUpdateModal] = useState(false);
	const handleOpenUpdateCustomerModal = () => setOpenCustomerUpdateModal(true);
	const handleCloseCustomerUpdateModal = () =>
		setOpenCustomerUpdateModal(false);

	const { user } = useAuth();

	useEffect(() => {
		fetch(`https://floating-ocean-21128.herokuapp.com/users`)
			.then((res) => res.json())
			.then((data) => setCustomerInfo(data));
	}, []);

	const matchCurrentUser = customerInfo.filter(
		(customer) => customer.email === user.email
	);

	return (
		<>
			<div id="customer-profile">
				<Typography variant="h3" gutterBottom component="div">
					My Account - Customer Info
				</Typography>
				<hr />
				{customerInfo.length !== 0 && (
					<div>
						<table>
							<thead>
								<tr>
									<th>Name</th>
									<th>{matchCurrentUser[0]?.displayName}</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Email</td>
									<td>{matchCurrentUser[0]?.email}</td>
								</tr>
								<tr>
									<td>Phone</td>
									<td>{matchCurrentUser[0]?.phoneNumber}</td>
								</tr>
								<tr>
									<td>Address</td>
									<td>{matchCurrentUser[0]?.address}</td>
								</tr>
								<tr>
									<td>City</td>
									<td>{matchCurrentUser[0]?.city}</td>
								</tr>
								<tr>
									<td>Country</td>
									<td>{matchCurrentUser[0]?.country}</td>
								</tr>
							</tbody>
						</table>
					</div>
				)}

				<Button
					onClick={() =>
						handleOpenUpdateCustomerModal(matchCurrentUser[0]?._id)
					}
					variant="contained"
					sx={{ marginTop: 3 }}
				>
					Update
				</Button>
			</div>
			<UpdateCustomerProfileModal
				customerEmail={matchCurrentUser[0]?.email}
				openCustomerUpdateModal={openCustomerUpdateModal}
				handleCloseCustomerUpdateModal={handleCloseCustomerUpdateModal}
			></UpdateCustomerProfileModal>
		</>
	);
};

export default CustomerProfile;
