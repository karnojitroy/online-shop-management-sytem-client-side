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
const UpdateProductModal = ({
	productId,
	openEditProductModal,
	handleCloseEditProductModal
}) => {
	const [productInfo, setProductInfo] = useState({});
	useEffect(() => {
		const url = `https://floating-ocean-21128.herokuapp.com/products/${productId}`;
		fetch(url)
			.then((res) => res.json())
			.then((data) => setProductInfo(data));
	}, [productId]);
	// console.log(productInfo.features[0]);
	const handleOnChange = (e) => {
		const field = e.target.name;
		const value = e.target.value;
		const updateInfo = { ...productInfo };
		updateInfo[field] = value;
		setProductInfo(updateInfo);
	};
	// console.log(productInfo);

	const handleUpdateProductSubmit = (e) => {
		// send to servers
		const url = `https://floating-ocean-21128.herokuapp.com/products/${productId}`;
		fetch(url, {
			method: "PUT",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify(productInfo)
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.modifiedCount > 0) {
					swal("Product Update", "Successful!", "success");
					handleCloseEditProductModal();
				}
			});
		e.preventDefault();
	};
	return (
		<Modal
			aria-labelledby="transition-modal-title"
			aria-describedby="transition-modal-description"
			open={openEditProductModal}
			onClose={handleCloseEditProductModal}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500
			}}
		>
			<Fade in={openEditProductModal}>
				<Box sx={style}>
					<Typography
						variant="h6"
						sx={{ color: "info.main", textAlign: "center" }}
						display="block"
						gutterBottom
					>
						Update Product Information
					</Typography>
					<form onSubmit={handleUpdateProductSubmit}>
						<TextField
							sx={{ width: "100%", my: 1 }}
							id="outlined-size-small"
							label="Product name"
							name="name"
							value={productInfo.name || ""}
							onChange={handleOnChange}
							size="small"
						/>
						<TextField
							sx={{ width: "100%", my: 1 }}
							id="outlined-size-small"
							name="img"
							label="Image link"
							value={productInfo.img || ""}
							onChange={handleOnChange}
							size="small"
						/>
						<TextField
							sx={{ width: "47%", my: 1 }}
							id="outlined-size-small"
							name="price"
							label="Price"
							value={productInfo.price || ""}
							onChange={handleOnChange}
							size="small"
						/>
						<TextField
							sx={{ width: "47%", my: 1, ml: 4 }}
							id="outlined-size-small"
							name="ratings"
							label="Ratings"
							value={productInfo.ratings || ""}
							onChange={handleOnChange}
							size="small"
						/>
						<TextField
							sx={{ width: "47%", my: 1 }}
							id="outlined-size-small"
							name="soldBy"
							label="Sold by"
							value={productInfo.soldBy || ""}
							onChange={handleOnChange}
							size="small"
						/>
						<TextField
							sx={{ width: "47%", my: 1, ml: 4 }}
							id="outlined-size-small"
							name="stock"
							label="Stock"
							value={productInfo.stock || ""}
							onChange={handleOnChange}
							size="small"
						/>
						<TextField
							sx={{ width: "47%", my: 1 }}
							id="outlined-size-small"
							name="display"
							label="Display"
							value={productInfo.display || ""}
							onChange={handleOnChange}
							size="small"
						/>
						<TextField
							sx={{ width: "47%", my: 1, ml: 4 }}
							id="outlined-size-small"
							name="color"
							label="color"
							value={productInfo.color || ""}
							onChange={handleOnChange}
							size="small"
						/>
						<TextField
							sx={{ width: "100%", my: 1 }}
							id="outlined-size-small"
							name="cpu"
							label="cpu"
							value={productInfo.cpu || ""}
							onChange={handleOnChange}
							size="small"
						/>
						<TextField
							sx={{ width: "100%", my: 1 }}
							id="outlined-size-small"
							name="memory"
							label="Memory size"
							value={productInfo.memory || ""}
							onChange={handleOnChange}
							size="small"
						/>
						<TextField
							sx={{ width: "100%", my: 1 }}
							id="outlined-size-small"
							name="front_camera"
							label="PFront Camera"
							value={productInfo.front_camera || ""}
							onChange={handleOnChange}
							size="small"
						/>
						<TextField
							sx={{ width: "100%", my: 1 }}
							id="outlined-size-small"
							name="rear_camera"
							label="Rear camera"
							value={productInfo.rear_camera || ""}
							onChange={handleOnChange}
							size="small"
						/>

						<br />
						<Button
							variant="contained"
							type="submit"
							sx={{ alignItems: "right" }}
						>
							Submit
						</Button>
					</form>
				</Box>
			</Fade>
		</Modal>
	);
};

export default UpdateProductModal;
