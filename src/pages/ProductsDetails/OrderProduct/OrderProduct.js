/* eslint-disable no-restricted-globals */
import swal from "sweetalert";
import useEnhancedEffect from "@mui/utils/useEnhancedEffect";
import Button from "@restart/ui/esm/Button";
import React, { useState, useEffect } from "react";
import { Card, Col, Container, Navbar, Row, Spinner } from "react-bootstrap";
import { NavLink, useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import logo from "../../../images/logo.png";
import "./OrderProduct.css";

const brandNameStyle = {
	fontWeight: "bold",
	color: "black",
	textDecoration: "none",
	padding: "20px"
};
const inputStyle = {
	width: "100%",
	marginTop: "15px",
	height: "45px"
};

// purchase component which will display product info and order option
const OrderProduct = () => {
	const { productId } = useParams();
	const [product, setProduct] = useState([]);
	const [customerInfo, setCustomernfo] = useState({});
	const [phoneQuentity, setPhoneQuenity] = useState(1);
	const { user, isLoading } = useAuth();

	useEnhancedEffect(() => {
		if (isLoading) {
			return <Spinner className="my-5" animation="border" variant="success" />;
		}
		fetch(`http://localhost:5000/products/${productId}`)
			.then((res) => res.json())
			.then((data) => setProduct(data));
	}, [productId]);

	useEffect(() => {
		const url = `http://localhost:5000/users/userEmail/${user.email}`;
		fetch(url)
			.then((res) => res.json())
			.then((data) => setCustomernfo(data));
	}, [user.email]);

	// handle phone item count
	const handlePlus = () => {
		setPhoneQuenity(phoneQuentity + 1);
	};
	const handleMinus = () => {
		if (phoneQuentity > 1) {
			setPhoneQuenity(phoneQuentity - 1);
		}
	};

	const handleIntemCount = (e) => {
		setPhoneQuenity(e.target.value);
	};
	// calculate cost
	let totalPrice = product.price * phoneQuentity;
	const shippingCost = 5;
	const totalShippingCost = phoneQuentity * shippingCost;
	const tax = (totalPrice * 7) / 100;
	const totalOrderCost = totalPrice + totalShippingCost + tax;

	const orderInfo = {
		customerName: customerInfo?.displayName,
		customerEmail: customerInfo?.email,
		customerPhone: customerInfo?.phoneNumber,
		customerAddress: customerInfo.address
	};

	// handle order submit
	const handleOrderSubmit = (e) => {
		e.preventDefault();
		if (
			customerInfo.phoneNumber === undefined ||
			customerInfo.phoneNumber === " "
		) {
			alert(
				"Please Add your phone number in your account and complete your profile"
			);
			return;
		} else if (
			customerInfo.address === undefined ||
			customerInfo.address === " "
		) {
			alert(
				"Please Add your shipping  addres in your account and complete your profile"
			);
			return;
		} else if (
			customerInfo.phoneNumber === undefined ||
			customerInfo.phoneNumber === " " ||
			customerInfo.address === undefined ||
			customerInfo.address === " "
		) {
			alert(
				"Please Add your phone number and shipping  addres in your account and complete your profile"
			);
			return;
		} else {
			if (confirm("Are you sure you want to Order now??")) {
				const orderRequestInfo = {
					productName: product.name,
					productQuentity: phoneQuentity,
					price: product.price,
					totalPrice: totalPrice.toFixed(2),
					totalShippingCost: totalShippingCost.toFixed(2),
					tax: tax.toFixed(2),
					totalOrderCost: totalOrderCost.toFixed(2),
					...orderInfo,
					status: "Pending",
					payment: { payment_status: "Pending" },
					date: new Date().toLocaleDateString()
				};

				// send to servers

				fetch("http://localhost:5000/orderRequest", {
					method: "POST",
					headers: {
						"content-type": "application/json"
					},
					body: JSON.stringify(orderRequestInfo)
				})
					.then((res) => res.json())
					.then((data) => {
						if (data.insertedId)
							swal(
								"Order placed successfully",
								"Go to the dashboard,Complete payment and confirm the order",
								"success"
							);
					});
			}
		}
	};
	return (
		<div>
			<Navbar>
				<Container className="d-flex justify-content-between">
					<NavLink to="/" style={brandNameStyle}>
						<img src={logo} alt="" width="50" />
						<b>Mobile Mart</b>
					</NavLink>
					<NavLink to="/dashboard" sx={{ color: "success" }}>
						Go To Dashboard
					</NavLink>
				</Container>
			</Navbar>
			{product.price ? (
				<Container className="my-5">
					<Row>
						<Col xs={12} md={7}>
							<Card>
								<div className="d-flex">
									<Card.Img
										variant="top"
										src={`data:image/jpg;base64,${product?.img}`}
										className="w-50"
									/>
									<div className="input-group my-auto ms-3 me-3">
										<button onClick={handleMinus} className="btn btn-default">
											<i className="fas fa-minus"></i>
										</button>
										<input
											type="number"
											className="form-control text-center"
											value={phoneQuentity}
											onChange={handleIntemCount}
										/>
										<button onClick={handlePlus} className="btn btn-default">
											<i className="fas fa-plus"></i>
										</button>
									</div>
								</div>
								<Card.Body>
									<Card.Title className="text-primary">
										{product.name}
									</Card.Title>
									{/* {product.price && ( */}
									<h6 className="text-danger">Price: ${product.price}</h6>
									{/* )} */}
									<p>{product.description}</p>
								</Card.Body>
							</Card>
						</Col>
						<Col xs={12} md={5}>
							<div className="cart-bg">
								<h4>Order Now</h4>
								{/* Order form */}
								<form onSubmit={handleOrderSubmit}>
									<p>Product: </p>
									<input
										disabled
										className="input-style"
										id="outlined-size-p"
										defaultValue={product?.name}
									/>{" "}
									<br />
									<p>Quentity: </p>
									<input
										disabled
										className="input-style"
										id="outlined-size-p"
										value={phoneQuentity}
									/>{" "}
									<br />
									<p>Price in doller: </p>
									<input
										disabled
										className="input-style-color-cyan"
										id="outlined-size-p"
										value={totalPrice.toFixed(2)}
									/>{" "}
									<br />
									<p>Tax 7%: </p>
									<input
										disabled
										className="input-style-color-cyan"
										id="outlined-size-p"
										value={tax.toFixed(2)}
									/>{" "}
									<br />
									<p>Shipping Cost item/ 5$: </p>
									<input
										disabled
										className="input-style-color-cyan"
										id="outlined-size-p"
										value={totalShippingCost.toFixed(2)}
									/>{" "}
									<br />
									<p>Total Cost: </p>
									<input
										disabled
										className="input-style-color-cyan"
										id="outlined-size-p"
										value={totalOrderCost.toFixed(2)}
									/>{" "}
									<br />
									<p>Customer name: </p>
									<input
										required
										disabled
										className="input-style"
										id="outlined-size-p"
										defaultValue={customerInfo?.displayName}
									/>{" "}
									<br />
									<p>Email: </p>
									<input
										required
										disabled
										className="input-style"
										id="outlined-size-p"
										defaultValue={customerInfo?.email}
									/>
									<br />
									<p>
										Phone: [
										<span className="text-danger">
											You can change it from your profile
										</span>
										]
									</p>
									<input
										disabled
										className="input-style"
										id="outlined-size-p"
										defaultValue={customerInfo?.phoneNumber}
									/>
									<br />
									<p>
										Shipping Address: [
										<span className="text-danger">
											You can change it from your profile
										</span>
										]{" "}
									</p>
									<textarea
										disabled
										className="input-style"
										id="outlined-size-p"
										defaultValue={customerInfo?.address}
										rows="auto"
									/>
									<br />
									<Button
										variant="contained"
										type="submit"
										className="btn btn-purchase"
										style={inputStyle}
										sx={{ alignItems: "right" }}
									>
										{
											<FontAwesomeIcon
												style={{ marginRight: "5px" }}
												icon={faShoppingCart}
											/>
										}
										Place Order
									</Button>
								</form>
							</div>
						</Col>
					</Row>
				</Container>
			) : (
				<Spinner className="my-5" animation="border" variant="success" />
			)}
		</div>
	);
};

export default OrderProduct;
