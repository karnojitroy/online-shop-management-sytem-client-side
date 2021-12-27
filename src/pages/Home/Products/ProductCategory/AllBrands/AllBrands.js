import React from "react";
import { Card, Button, NavLink } from "react-bootstrap";

import Rating from "react-rating";
import "./AllBrands.css";

const AllBrands = (props) => {
	const { displayProducts } = props;
	console.log(displayProducts);

	return (
		<>
			<div className="product-container">
				<div className="row">
					{displayProducts.map((product, index) => (
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
										initialRating={product?.rating}
										readonly
										fullSymbol="fas fa-star full-star"
										emptySymbol="fas fa-star empty-star"
									></Rating>
									<NavLink
										to={`/product-details/${product._id}`}
										className="mb-1"
									>
										<Button className="btn btn-details my-3 w-75">
											Details
										</Button>
									</NavLink>
								</Card.Body>
							</Card>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default AllBrands;
