import React from "react";
import { Card, Button, Spinner } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Rating from "react-rating";

// this is for display products in home paget
const ProductHome = (props) => {
	const { products } = props;

	return (
		<>
			<div className="product-container">
				{/* {products.length === 0 ? (
					<Spinner className="mt-5" animation="border" variant="success" />
				) : ( */}
				<div className="row">
					{products.slice(0, 6).map((product, index) => (
						<div className="col-sm-12 col-md-4 g-4" key={index}>
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

export default ProductHome;
