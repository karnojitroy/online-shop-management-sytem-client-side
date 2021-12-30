/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import swal from "sweetalert";

const Admins = () => {
	const [admins, setAdmins] = useState([]);

	useEffect(() => {
		fetch("https://floating-ocean-21128.herokuapp.com/users")
			.then((res) => res.json())
			.then((data) => {
				const admin = data.filter((user) => user.role === "admin");
				setAdmins(admin);
			});
	}, []);
	console.log(admins);

	const deleteAdmin = (id) => {
		if (confirm("Are you sure you want to Delete now?")) {
			const url = `https://floating-ocean-21128.herokuapp.com/users/${id}`;
			fetch(url, {
				method: "DELETE"
			})
				.then((res) => res.json())
				.then((data) => {
					const remainingAdmins = admins.filter((admin) => admin._id !== id);
					setAdmins(remainingAdmins);
					swal(" Admin", "Deleted successful!", "success");
				});
		}
	};

	return (
		<>
			<h2>Admins</h2>
			<Divider />
			{admins.map((admin, index) => (
				<List
					sx={{ width: "100%", maxWidth: 400, bgcolor: "background.paper" }}
					key={index}
				>
					<ListItem
						onClick={() => deleteAdmin(admin._id)}
						alignItems="flex-start"
						secondaryAction={
							<IconButton edge="end" aria-label="delete">
								<DeleteIcon />
							</IconButton>
						}
					>
						<ListItemAvatar>
							{admin.photoURL ? (
								<Avatar alt="Remy Sharp" src={admin?.photoURL} />
							) : (
								<Avatar src="/broken-image.jpg" />
							)}
						</ListItemAvatar>

						<ListItemText
							primary={admin.displayName}
							secondary={
								<React.Fragment>
									<Typography
										sx={{ display: "inline" }}
										component="span"
										variant="body2"
										color="text.primary"
									>
										Role : {admin?.role}
									</Typography>
									<br />
									<Typography
										sx={{ display: "inline" }}
										component="span"
										variant="body2"
										color="text.primary"
									>
										Email: {admin?.email}
									</Typography>
								</React.Fragment>
							}
						/>
					</ListItem>

					<Divider variant="inset" component="li" />
				</List>
			))}
		</>
	);
};

export default Admins;
