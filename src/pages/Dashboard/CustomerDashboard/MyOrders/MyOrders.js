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
import useAuth from "../../../../hooks/useAuth";
import { NavLink } from "react-router-dom";

// This is My order component for customer where customer can see their orders
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

export default function MyOrders() {
	const { user } = useAuth();
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		fetch(
			`https://floating-ocean-21128.herokuapp.com/orderRequest/${user.email}`
		)
			.then((res) => res.json())
			.then((data) => setOrders(data));
	}, [user.email]);
	// console.log(status);

	function createData(
		pName,
		Uname,
		Email,
		Phone,
		Address,
		productQuentity,
		totalOrderCost,
		Payment,
		_id,
		Status,
		Delete
	) {
		return {
			pName,
			Uname,
			Email,
			Phone,
			Address,
			productQuentity,
			totalOrderCost,
			Payment,
			_id,
			Status,
			Delete
		};
	}
	const rows = [
		orders.map((order) =>
			createData(
				order.productName,
				order.customerName,
				order.email,
				order.phone,
				order.address,
				order.productQuentity,
				order.totalOrderCost,
				order.payment,
				order._id,
				<Typography
					variant="caption"
					sx={{ color: "primary.main", cursor: "pointer" }}
				>
					{order.status}
				</Typography>,
				<Typography
					onClick={() => handleDelete(order._id)}
					variant="caption"
					sx={{
						color: "white",
						backgroundColor: "error.main",
						borderRadius: 10,
						padding: "6px 16px",
						cursor: "pointer"
					}}
				>
					Delete
				</Typography>
			)
		)
	];
	// delete order
	const handleDelete = (id) => {
		if (confirm("Are you sure you want to book now??")) {
			const url = `https://floating-ocean-21128.herokuapp.com/orderRequest/${id}`;
			fetch(url, {
				method: "DELETE"
			})
				.then((res) => res.json())
				.then((data) => {
					const remainingOrder = orders.filter((order) => order._id !== id);
					setOrders(remainingOrder);
					swal(" Order", "Deleted successful!", "success");
				});
		}
	};

	return (
		<TableContainer component={Paper}>
			<Typography variant="h3" gutterBottom component="div">
				My Orders
			</Typography>
			<Table sx={{ minWidth: 1000 }} aria-label="customized table">
				<TableHead>
					<TableRow>
						<StyledTableCell>Product Name</StyledTableCell>
						<StyledTableCell align="right">User Name</StyledTableCell>
						<StyledTableCell align="right">Email</StyledTableCell>
						<StyledTableCell align="right">Phone</StyledTableCell>
						<StyledTableCell align="right">Address</StyledTableCell>
						<StyledTableCell align="right">Quentity</StyledTableCell>
						<StyledTableCell align="right">Amount/ Payment</StyledTableCell>
						<StyledTableCell align="right">Order Status</StyledTableCell>
						<StyledTableCell align="right">Delete</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows[0].map((row, i) => (
						<StyledTableRow key={i}>
							<StyledTableCell component="th" scope="row">
								{row.pName}
							</StyledTableCell>
							<StyledTableCell align="right">{row.Uname}</StyledTableCell>
							<StyledTableCell align="right">{row.Email}</StyledTableCell>
							<StyledTableCell align="right">{row.Phone}</StyledTableCell>
							<StyledTableCell align="right">{row.Address}</StyledTableCell>
							<StyledTableCell align="right">
								{row.productQuentity}
							</StyledTableCell>
							<StyledTableCell align="right">
								<span style={{ color: "black" }}>$ {row.totalOrderCost}</span>{" "}
								{row.Payment === "Pending" ? (
									<NavLink to={`/dashboard/payment/${row._id}`}>
										<Typography
											variant="caption"
											sx={{
												color: "white",
												backgroundColor: "primary.main",
												borderRadius: 6,
												padding: "3px 17px",
												cursor: "pointer"
											}}
										>
											Pay
										</Typography>
									</NavLink>
								) : (
									<span style={{ color: "#1976d2", marginLeft: "2px" }}>
										/ Paid
									</span>
								)}
							</StyledTableCell>
							<StyledTableCell align="right">{row.Status}</StyledTableCell>
							<StyledTableCell align="right">{row.Delete}</StyledTableCell>
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
