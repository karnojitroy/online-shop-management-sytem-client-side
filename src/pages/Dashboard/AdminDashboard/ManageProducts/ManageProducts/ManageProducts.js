/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Divider, Grid } from "@mui/material";
import swal from "sweetalert";
import { Box } from "@mui/system";
import Container from "@mui/material/Container";
import ManageProduct from "../ManageProduct/ManageProduct";

//  manage product for admin who can edit product info and delete product
const ManageProducts = () => {
	const [manageProducts, setManageProducts] = useState([]);

	useEffect(() => {
		fetch("http://localhost:5000/products")
			.then((res) => res.json())
			.then((data) => setManageProducts(data));
	}, []);

	const handleDeleteProduct = (id) => {
		if (confirm("Are you sure you want to delete the item now??")) {
			const url = `http://localhost:5000/products/${id}`;
			fetch(url, {
				method: "DELETE"
			})
				.then((res) => res.json())
				.then((data) => {
					const remainingOrder = manageProducts.filter(
						(product) => product._id !== id
					);
					setManageProducts(remainingOrder);
					swal(" Product", "delete successful!", "success");
				});
		}
	};

	return (
		<Container>
			<Typography variant="h3" gutterBottom component="div">
				Manage Products
			</Typography>
			<Divider />
			{/* send each product to ManageProduct component */}
			<Box sx={{ flexGrow: 1, marginTop: 10 }}>
				<Grid
					container
					spacing={{ xs: 2, md: 4 }}
					columns={{ xs: 4, sm: 8, md: 12 }}
				>
					{manageProducts.map((product, index) => (
						<ManageProduct
							key={index}
							product={product}
							handleDeleteProduct={handleDeleteProduct}
						></ManageProduct>
					))}
				</Grid>
			</Box>
		</Container>
	);
};

export default ManageProducts;
