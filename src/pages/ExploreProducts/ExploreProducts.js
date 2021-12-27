import Button from "@restart/ui/esm/Button";
import React, { useEffect, useState } from "react";
import { Card, ListGroup, Spinner } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Navigation from "../Shared/Navigation/Navigation";
import Rating from "react-rating";
import "./ExploreProducts.css";
import Footer from "../Shared/Footer/Footer";
// app products will show here || explore page
const ExploreProducts = () => {
	const [exProducts, setExProducts] = useState([]);

	// fetch all the products
	useEffect(() => {
		fetch("http://localhost:5000/products")
			.then((res) => res.json())
			.then((data) => setExProducts(data));
	}, []);

	return (
		<div>
			<Navigation></Navigation>
			<div className="container my-5 pt-5" id="products">
				<h2>Our Products</h2>
				<hr
					className="mx-auto"
					style={{ width: "25%", alignItems: "center", color: "black" }}
				/>
			</div>
			<div className="products-main-container">
				<div className="category-container">
					<ListGroup>
						<ListGroup.Item>iPhone</ListGroup.Item>
						<ListGroup.Item>Vivo</ListGroup.Item>
						<ListGroup.Item>Samsung</ListGroup.Item>
						<ListGroup.Item>Xiaomi</ListGroup.Item>
						<ListGroup.Item>Oppo</ListGroup.Item>
						<ListGroup.Item>Realme</ListGroup.Item>
						<ListGroup.Item>Huawei</ListGroup.Item>
					</ListGroup>
				</div>
				<div className="product-container">
					{exProducts.length === 0 ? (
						<Spinner className="my-5" animation="border" variant="success" />
					) : (
						<div className="row">
							{exProducts.map((product, index) => (
								<div className=" col-sm-1 col-lg-4 g-4" key={index}>
									<Card className="card" style={{ height: "500px" }}>
										<Card.Img
											variant="top"
											src={`data:image/jpg;base64,${product?.img}`}
											style={{ height: "245px", objectFit: "contain" }}
										/>
										<Card.Body>
											<Card.Title className="text-primary">
												{product?.name}
											</Card.Title>
											<p>Price: ${product?.price}</p>
											<p>Stock: {product?.stock}</p>
											<Rating
												readOnly
												initialRating={product?.ratings}
												readonly
												fullSymbol="fas fa-star full-star"
												emptySymbol="fas fa-star empty-star"
											></Rating>
											<NavLink
												to={`/product-details/${product._id}`}
												className="mb-1"
											>
												<Button className=" btn btn-details my-3 w-75">
													Details
												</Button>
											</NavLink>
										</Card.Body>
									</Card>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
			<Footer></Footer>
		</div>
	);
};

export default ExploreProducts;
