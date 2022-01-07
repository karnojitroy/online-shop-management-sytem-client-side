import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { Spinner } from "react-bootstrap";

const stripePromise = loadStripe(
	"pk_test_51K8HzhF6aqSklOshE3ywdLTnVvoRL01RV9mkGCCdcsjLZe7PEcdOi0qbGlFmlW7zszQsx8oZBQ9yt4azM2JJWH2600EcLkCYhy"
);

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	textAlign: "center",
	color: theme.palette.text.secondary,
	height: "auto",
	lineHeight: "30px"
}));

const darkTheme = createTheme({ palette: { mode: "dark" } });

// This is payment component
const Payment = () => {
	const { orderId } = useParams();
	const [myOrder, setMyOrder] = useState([]);

	useEffect(() => {
		fetch(`http://localhost:5000/orderRequest/orderId/${orderId}`)
			.then((res) => res.json())
			.then((data) => setMyOrder(data));
	}, [orderId]);
	// console.log(myOrder);
	return (
		<div className="container " id="explore">
			<h2>Payment</h2>
			<hr
				className="mx-auto"
				style={{ width: "25%", alignItems: "center", color: "black" }}
			/>
			<div className="row">
				{myOrder.length === 0 ? (
					<Spinner
						className="my-5 mx-auto"
						animation="border"
						variant="success"
					/>
				) : (
					<div>
						<h4>
							Pay for{" "}
							<span style={{ color: "#1976d2" }}>{myOrder.productName}</span>
						</h4>
						<h5>${myOrder.totalOrderCost}</h5>

						<Grid container spacing={2}>
							{[darkTheme].map((theme, index) => (
								<Grid
									item
									xs={12}
									sx={{ marginLeft: "auto", marginRight: "auto" }}
									key={index}
								>
									<ThemeProvider theme={theme}>
										<Box
											sx={{
												p: 2,
												bgcolor: "background.default",
												display: "grid",
												gridTemplateColumns: { md: "1fr" }
											}}
										>
											<Item>
												<div style={{ margin: "30px 5px 0px 5px" }}>
													<Elements stripe={stripePromise}>
														<CheckoutForm myOrder={myOrder} />
													</Elements>
												</div>
											</Item>
										</Box>
									</ThemeProvider>
								</Grid>
							))}
						</Grid>
					</div>
				)}
			</div>
		</div>
	);
};

export default Payment;
