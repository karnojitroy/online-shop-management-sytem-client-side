/* eslint-disable no-restricted-globals */
import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import UpdateProductModal from "../UpdateProductModal/UpdateProductModal";

// here the function of edit and delete product info
const ManageProduct = ({ product, handleDeleteProduct }) => {
	const { img, name } = product;
	const [openEditProductModal, setOpenEditProductModal] = useState(false);
	const handleOpenEditProductModal = () => setOpenEditProductModal(true);
	const handleCloseEditProductModal = () => setOpenEditProductModal(false);

	return (
		<>
			<Grid item xs={2} sm={4} md={4}>
				<Paper sx={{ minHeight: 150 }}>
					<Box>
						<img
							src={`data:image/jpg;base64,${img}`}
							alt=""
							style={{ width: "50px", height: "60px", objectFit: "contain" }}
						/>
					</Box>
					<Typography variant="b2" gutterBottom component="div">
						{name}
					</Typography>
					<Box sx={{ paddingBottom: "10px" }}>
						<Typography
							onClick={() => handleOpenEditProductModal(product._id)}
							variant="caption"
							sx={{
								color: "white",
								backgroundColor: "success.main",
								borderRadius: 10,
								padding: "6px 25px",
								cursor: "pointer",
								marginRight: "15px"
							}}
						>
							EDIT
						</Typography>
						<Typography
							onClick={() => handleDeleteProduct(product._id)}
							variant="caption"
							sx={{
								color: "white",
								backgroundColor: "error.main",
								borderRadius: 10,
								padding: "6px 16px",
								cursor: "pointer"
							}}
						>
							DELETE
						</Typography>
					</Box>
				</Paper>
			</Grid>
			<UpdateProductModal
				productId={product._id}
				openEditProductModal={openEditProductModal}
				handleCloseEditProductModal={handleCloseEditProductModal}
			></UpdateProductModal>
		</>
	);
};

export default ManageProduct;
