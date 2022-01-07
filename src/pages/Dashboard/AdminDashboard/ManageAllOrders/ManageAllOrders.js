/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import swal from "sweetalert";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 11
	}
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(odd)": {
		backgroundColor: theme.palette.action.hover
	},
	// hide last border
	"&:last-child td, &:last-child th": {
		border: 0
	}
}));

//  manage all products || admin can approve the orders and can delete from here

export default function ManageAllOrders() {
	const [orders, setOrders] = useState([]);
	const [status, setStatus] = useState("");

	useEffect(() => {
		fetch("http://localhost:5000/orderRequest")
			.then((res) => res.json())
			.then((data) => setOrders(data));
	}, []);
	function createData(
		pName,
		customerName,
		Date,
		customerPhone,
		customerAddress,
		productQuentity,
		totalPrice,
		Payment,
		OrderStatus,
		OrderStatusAction,
		Delete
	) {
		return {
			pName,
			customerName,
			Date,
			customerPhone,
			customerAddress,
			productQuentity,
			totalPrice,
			Payment,
			OrderStatus,
			_id: OrderStatusAction,
			Delete
		};
	}
	const rows = [
		orders.map((order) =>
			createData(
				order?.productName,
				order?.customerName,
				order?.date,
				order?.customerPhone,
				order?.customerAddress,
				order?.productQuentity,
				order?.totalPrice,
				order?.payment?.payment_status,
				order?.status,
				order?._id,
				<Typography
					onClick={() => handleDelete(order?._id)}
					variant="caption"
					sx={{
						color: "white",
						backgroundColor: "error.main",
						borderRadius: 1,
						padding: "3px 10px",
						cursor: "pointer"
					}}
				>
					Delete
				</Typography>
			)
		)
	];
	// orders.map((order) => console.log("s", order?.status));

	const handleStatusChange = (e) => {
		setStatus(e.target.value);
		console.log(e.target.value);
	};

	// update order status pending to Shipped
	const handleUpdateStatus = (id) => {
		if (confirm("Are you sure?")) {
			fetch(`http://localhost:5000/status/${id}`, {
				method: "PUT",
				headers: {
					"content-type": "application/json"
				},
				body: JSON.stringify({ status: status })
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.modifiedCount) {
						setStatus(status);
					}
				});
		}
	};

	// handle delete product
	const handleDelete = (id) => {
		if (confirm("Are you sure you want to delete now??")) {
			const url = `http://localhost:5000/orderRequest/${id}`;
			fetch(url, {
				method: "DELETE"
			})
				.then((res) => res.json())
				.then((data) => {
					const remainingOrder = orders.filter((order) => order?._id !== id);
					setOrders(remainingOrder);
					swal(" Order", "Deleted successful!", "success");
				});
		}
	};

	return (
		// table for display order's information
		<TableContainer component={Paper}>
			<Typography variant="h3" gutterBottom component="div">
				Manage All Orders
			</Typography>
			<Table sx={{ minWidth: 1000 }} aria-label="customized table">
				<TableHead>
					<TableRow>
						<StyledTableCell>Product Name</StyledTableCell>
						<StyledTableCell align="right">User Name</StyledTableCell>
						<StyledTableCell align="right">Date</StyledTableCell>
						<StyledTableCell align="right">Phone</StyledTableCell>
						<StyledTableCell align="right">customerAddress</StyledTableCell>
						<StyledTableCell align="right">Quentity</StyledTableCell>
						<StyledTableCell align="right">Amount/ Payment</StyledTableCell>
						<StyledTableCell align="right">
							Order Status & Action
						</StyledTableCell>
						<StyledTableCell align="right">Action</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows[0].map((row, i) => (
						<StyledTableRow key={i}>
							<StyledTableCell component="th" scope="row">
								{row.pName}
							</StyledTableCell>
							<StyledTableCell align="right">
								{row.customerName}
							</StyledTableCell>
							<StyledTableCell align="right">{row.Date}</StyledTableCell>
							<StyledTableCell align="right">
								{row.customerPhone}
							</StyledTableCell>
							<StyledTableCell align="right">
								{row.customerAddress}
							</StyledTableCell>
							<StyledTableCell align="right">
								{row.productQuentity}
							</StyledTableCell>
							<StyledTableCell align="right">
								<span style={{ color: "black" }}>$ {row.totalPrice}</span>/
								<span style={{ color: "#1976d2", marginLeft: "2px" }}>
									{row.Payment}
								</span>
							</StyledTableCell>
							<StyledTableCell align="left">
								<span
									style={{
										color: "#1976d2"
									}}
								>
									{row.OrderStatus}
								</span>

								<div style={{ textAlign: "left", display: "flex" }}>
									<form>
										<select
											value={status}
											label="Action"
											onChange={handleStatusChange}
										>
											<option value={row.OrderStatus}>Action</option>
											<option value="Cofirmed">Cofirmed</option>
											<option value="Denied">Denied</option>
											<option value="Shipped">Shipped</option>
										</select>
									</form>
									<button
										onClick={() => handleUpdateStatus(row._id)}
										style={{
											color: "white",
											display: "inline",
											backgroundColor: "#2e7d32",
											borderRadius: "3px",
											border: "none"
										}}
									>
										Submit
									</button>
								</div>
							</StyledTableCell>
							<StyledTableCell align="center">
								<br />
								{row.Delete}
							</StyledTableCell>
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
