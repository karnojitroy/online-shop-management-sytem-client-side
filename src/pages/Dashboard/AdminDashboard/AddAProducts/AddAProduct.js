/* eslint-disable no-restricted-globals */
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { Container, Input } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Alert } from "@mui/material";
import useAuth from "../../../../hooks/useAuth";
import CircularProgress from "@mui/material/CircularProgress";
import { useForm } from "react-hook-form";

const alertStyle = {
	justifyContent: "center",
	marginLeft: "auto",
	marginRight: "auto"
};

const AddAProduct = () => {
	const { isLoading } = useAuth();
	// const [productInfo, setProductInfo] = useState({});
	const [success, setSuccess] = useState(false);
	const [image, setImage] = useState(null);

	const { register, handleSubmit, reset } = useForm();
	const onSubmit = (data) => {
		if (confirm("Are you sure you want to Order now??")) {
			const formData = new FormData();
			formData.append("name", data.name);
			formData.append("img", image);
			formData.append("soldBy", data.soldBy);
			formData.append("stock", data.stock);
			formData.append("brand", data.brand);
			formData.append("display", data.display);
			formData.append("cpu", data.cpu);
			formData.append("memory", data.memory);
			formData.append("rear_camera", data.rear_camera);
			formData.append("front_camera", data.front_camera);
			formData.append("price", data.price);
			formData.append("color", data.color);
			formData.append("ratings", data.ratings);

			fetch("https://floating-ocean-21128.herokuapp.com/products", {
				method: "POST",
				body: formData
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.insertedId) {
						setSuccess(true);
						reset();
					}
				});
		}
	};

	return (
		<Container sx={{ my: 2 }}>
			<Box>
				<br />
				{/* product info input form */}
				{!isLoading && (
					<form onSubmit={handleSubmit(onSubmit)}>
						<Typography
							sx={{ marginBottom: 2 }}
							variant="h4"
							gutterBottom
							component="div"
						>
							Add a New Products
						</Typography>
						{/* success and error alert */}
						{success && (
							<Alert severity="success" style={alertStyle}>
								Product successfully added!
							</Alert>
						)}
						<TextField
							required
							sx={{
								width: "300px",
								marginTop: 4,
								marginLeft: 1,
								marginRight: 1
							}}
							label="Product Name"
							variant="standard"
							{...register("name", { required: true, min: 1 })}
							size="small"
						/>
						<Input
							required
							sx={{
								width: "300px",
								marginTop: 6,
								marginLeft: 1,
								marginRight: 1
							}}
							accept="image/*"
							id="contained-button-file"
							type="file"
							onChange={(e) => setImage(e.target.files[0])}
						/>
						<br />
						<TextField
							required
							sx={{
								width: "300px",
								marginTop: 4,
								marginLeft: 1,
								marginRight: 1
							}}
							label="Sold By"
							variant="standard"
							{...register("soldBy", { required: true, min: 1 })}
							size="small"
						/>
						<TextField
							required
							sx={{
								width: "300px",
								marginTop: 4,
								marginLeft: 1,
								marginRight: 1
							}}
							label="Stock"
							variant="standard"
							{...register("stock", { required: true, min: 1 })}
							size="small"
						/>
						<br />
						<TextField
							required
							sx={{
								width: "300px",
								marginTop: 4,
								marginLeft: 1,
								marginRight: 1
							}}
							label="Brand Name"
							variant="standard"
							{...register("brand", { required: true, min: 1 })}
							size="small"
						/>
						<TextField
							required
							sx={{
								width: "300px",
								marginTop: 4,
								marginLeft: 1,
								marginRight: 1
							}}
							label="Display"
							variant="standard"
							{...register("display", { required: true, min: 1 })}
							size="small"
						/>
						<br />
						<TextField
							required
							sx={{
								width: "300px",
								marginTop: 4,
								marginLeft: 1,
								marginRight: 1
							}}
							label="CPU"
							variant="standard"
							{...register("cpu", { required: true, min: 1 })}
							size="small"
						/>
						<TextField
							required
							sx={{
								width: "300px",
								marginTop: 4,
								marginLeft: 1,
								marginRight: 1
							}}
							label="Memory size"
							variant="standard"
							{...register("memory", { required: true, min: 1 })}
							size="small"
						/>
						<br />
						<TextField
							required
							sx={{
								width: "300px",
								marginTop: 4,
								marginLeft: 1,
								marginRight: 1
							}}
							label="Rear camera"
							variant="standard"
							{...register("rear_camera", { required: true, min: 1 })}
							size="small"
						/>
						{/* <br /> */}
						<TextField
							required
							sx={{
								width: "300px",
								marginTop: 4,
								marginLeft: 1,
								marginRight: 1
							}}
							label="Front camera"
							variant="standard"
							{...register("front_camera", { required: true, min: 1 })}
							size="small"
						/>
						<br />
						<TextField
							required
							sx={{
								width: "300px",
								marginTop: 4,
								marginLeft: 1,
								marginRight: 1
							}}
							label="Price"
							variant="standard"
							{...register("price", { required: true, min: 1 })}
							size="small"
						/>
						{/* <br /> */}
						<TextField
							required
							sx={{
								width: "300px",
								marginTop: 4,
								marginLeft: 1,
								marginRight: 1
							}}
							label="Color"
							variant="standard"
							{...register("color", { required: true, min: 1 })}
							size="small"
						/>
						<br />
						<TextField
							required
							sx={{
								width: "300px",
								marginTop: 4,
								marginLeft: 1,
								marginRight: 1
							}}
							label="Ragings 1 to 5"
							variant="standard"
							{...register("ratings", { required: true, min: 1 })}
							size="small"
						/>
						<br /> <br />
						<Button
							variant="contained"
							type="submit"
							sx={{
								alignItems: "right",
								width: "300px",
								marginLeft: 1,
								marginRight: 1
							}}
						>
							Add Product
						</Button>
					</form>
				)}
				{isLoading && <CircularProgress color="success" />}
			</Box>
		</Container>
	);
};

export default AddAProduct;
