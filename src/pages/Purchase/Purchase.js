/* eslint-disable no-restricted-globals */
import swal from "sweetalert";
import useEnhancedEffect from "@mui/utils/useEnhancedEffect";
import Button from "@restart/ui/esm/Button";
import React, { useState } from "react";
import { Card, Col, Container, Navbar, Row, Spinner } from "react-bootstrap";
import { NavLink, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import logo from "../../images/logo.png";
import "./Purchase.css";

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
const Purchase = () => {
	const { productId } = useParams();
	const [product, setProduct] = useState([]);
	const [phoneQuentity, setPhoneQuenity] = useState(1);
	const { user, isLoading } = useAuth();
	useEnhancedEffect(() => {
		if (isLoading) {
			return <Spinner className="my-5" animation="border" variant="success" />;
		}
		fetch(`https://floating-ocean-21128.herokuapp.com/products/${productId}`)
			.then((res) => res.json())
			.then((data) => setProduct(data));
	}, [productId]);
	const initialInfo = {
		customerName: user.displayName,
		email: user.email,
		phone: "",
		address: ""
	};
	const [orderInfo, setOrderingInfo] = useState(initialInfo);
	const handleOnBlur = (e) => {
		const field = e.target.name;
		const value = e.target.value;
		const updateOrderInfo = { ...orderInfo };
		updateOrderInfo[field] = value;
		setOrderingInfo(updateOrderInfo);
	};
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

	// handle order submit
	const handleOrderSubmit = (e) => {
		if (confirm("Are you sure you want to Order now??")) {
			e.preventDefault();
			const orderRequestInfo = {
				productName: product.name,
				productQuentity: phoneQuentity,
				price: product.price,
				totalPrice: totalPrice.toFixed(2),
				totalShipping: totalShippingCost.toFixed(2),
				tax: tax.toFixed(2),
				totalOrderCost: totalOrderCost.toFixed(2),
				...orderInfo,
				status: "Pending",
				payment: "Pending",
				date: new Date().toLocaleDateString()
			};

			// send to servers

			fetch("https://floating-ocean-21128.herokuapp.com/orderRequest", {
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
							"Go to the dashboard for payment",
							"success"
						);
				});
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
								<h4>Purchase Now</h4>
								{/* Order form */}
								<form onSubmit={handleOrderSubmit}>
									<p>Product: </p>
									<input
										disabled
										className="input-style"
										id="outlined-size-p"
										name="productName"
										defaultValue={product?.name}
										onBlur={handleOnBlur}
									/>{" "}
									<br />
									<p>Quentity: </p>
									<input
										disabled
										className="input-style"
										id="outlined-size-p"
										name="productQuentity"
										value={phoneQuentity}
										onBlur={handleOnBlur}
									/>{" "}
									<br />
									<p>Price in doller: </p>
									<input
										disabled
										className="input-style-color-cyan"
										id="outlined-size-p"
										name="price"
										value={totalPrice.toFixed(2)}
										onBlur={handleOnBlur}
									/>{" "}
									<br />
									<p>Tax 7%: </p>
									<input
										disabled
										className="input-style-color-cyan"
										id="outlined-size-p"
										name="price"
										value={tax.toFixed(2)}
										onBlur={handleOnBlur}
									/>{" "}
									<br />
									<p>Shipping Cost item/ 5$: </p>
									<input
										disabled
										className="input-style-color-cyan"
										id="outlined-size-p"
										name="price"
										value={totalShippingCost.toFixed(2)}
										onBlur={handleOnBlur}
									/>{" "}
									<br />
									<p>Total Cost: </p>
									<input
										disabled
										className="input-style-color-cyan"
										id="outlined-size-p"
										name="price"
										value={totalOrderCost.toFixed(2)}
										onBlur={handleOnBlur}
									/>{" "}
									<br />
									<p>Customer name: </p>
									<input
										required
										disabled
										className="input-style"
										id="outlined-size-p"
										name="customerName"
										defaultValue={user.displayName}
										onBlur={handleOnBlur}
									/>{" "}
									<br />
									<p>Email: </p>
									<input
										required
										disabled
										className="input-style"
										id="outlined-size-p"
										name="email"
										defaultValue={user.email}
										onBlur={handleOnBlur}
									/>
									<br />
									<input
										required
										style={inputStyle}
										id="outlined-size-p"
										name="phone"
										type="number"
										placeholder="Your Phone Number*"
										onChange={handleOnBlur}
									/>
									<br />
									<textarea
										required
										style={inputStyle}
										id="outlined-size-p"
										name="address"
										placeholder="Shipping Address*"
										onChange={handleOnBlur}
										rows="7"
									/>
									<br />
									<Button
										variant="contained"
										type="submit"
										className="btn btn-purchase"
										style={inputStyle}
										sx={{ alignItems: "right" }}
									>
										{<FontAwesomeIcon icon={faShoppingCart} />}
										Confirm Purchase
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

export default Purchase;
