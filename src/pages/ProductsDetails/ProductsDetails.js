import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Navigation from "../Shared/Navigation/Navigation";
import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./ProductDetails.css";
import { Button, Spinner } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import ProductReview from "./ProductReview/ProductReview";

// app products will show here || explore page
const ProductsDetails = () => {
	const { productId } = useParams();
	const [product, setProduct] = useState([]);
	const { admin } = useAuth();
	const [productReviews, setProductReviews] = useState([]);

	useEffect(() => {
		fetch(`http://localhost:5000/products/${productId}`)
			.then((res) => res.json())
			.then((data) => {
				setProduct(data);
			});
	}, [productId]);

	useEffect(() => {
		fetch(`http://localhost:5000/productReviews`)
			.then((res) => res.json())
			.then((data) => {
				setProductReviews(data);
			});
	}, []);

	const productReviewArr = productReviews.filter(
		(review) => review.productId === productId
	);
	let ratings = 0;
	let count = 0;
	for (const i of productReviewArr) {
		count = count + 1;
		ratings = (ratings + i.ratings) / count;
	}
	return (
		<div>
			<Navigation></Navigation>
			<div className="container my-5 " id="products">
				<h2>Product Details</h2>
				<hr
					className="mx-auto"
					style={{ width: "25%", alignItems: "center", color: "black" }}
				/>
			</div>

			{product.price ? (
				<div className="product">
					<div className="row row-cols-12 row-cols-sm-2 row-cols-md-5">
						<div className="col-md-3">
							<div>
								<img
									src={`data:image/jpg;base64,${product?.img}`}
									alt=""
									className="w-100"
								/>
							</div>
						</div>
						<div className="col-md-3 margin-left">
							<h5 className="product-name mt-3 ms-5">{product?.name}</h5>
							<div className="product-description ms-5">
								<div>
									<p>
										<small>Brand: {product?.brand}</small>
									</p>
									<p>
										<small>Sold by: {product?.soldBy}</small>
									</p>
									<p>
										<small className="p-price">${product?.price}</small>
									</p>
									<p>
										<small>stock only: {product?.stock}</small>
									</p>

									{admin ? (
										<Button className="btn btn-purchase my-3 w-75" disabled>
											<FontAwesomeIcon icon={faShoppingCart} /> Not for Admin
										</Button>
									) : (
										<NavLink
											to={`/order-product/${product._id}`}
											className="mb-1"
										>
											<Button className="btn btn-purchase my-3 w-75">
												{<FontAwesomeIcon icon={faShoppingCart} />} Order Now
											</Button>
										</NavLink>
									)}
								</div>
							</div>
						</div>
						<div className="col-md-6">
							<div className="ratting-feature margin-left">
								<div className="py-3">
									<Rating
										readOnly
										initialRating={product?.ratings}
										readonly
										fullSymbol="fas fa-star full-star"
										emptySymbol="fas fa-star empty-star"
									></Rating>
								</div>
								<p>Features</p>

								<ul>
									<li>
										<p>Display: {product?.display}</p>
									</li>
									<li>
										<p>Cpu: {product?.cpu}</p>
									</li>
									<li>
										<p>Memory:{product?.memory}</p>
									</li>
									<li>
										<p>Front-camera:{product?.front_camera}</p>
									</li>
									<li>
										<p>Rear-camera:{product?.rear_camera}</p>
									</li>
									<li>
										<p>Color:{product?.color}</p>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			) : (
				<Spinner className="my-5" animation="border" variant="success" />
			)}

			{product.price && (
				<div>
					<h4
						style={{
							marginTop: "30px",
							marginBottom: "20px",
							paddingLeft: "50px",
							textAlign: "left"
						}}
					>
						Review
					</h4>
					<div className="customer-reaview">
						<ProductReview productId={productId} />
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductsDetails;
