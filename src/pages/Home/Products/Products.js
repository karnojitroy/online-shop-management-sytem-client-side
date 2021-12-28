import Button from "@restart/ui/esm/Button";
import React, { useEffect, useState } from "react";
import Rating from "react-rating";
import "./Products.css";

import { NavLink } from "react-router-dom";
import { Card, Collapse, ListGroup, Spinner } from "react-bootstrap";

export default function Products() {
	const [products, setProducts] = useState([]);
	const [displayProducts, setDisplayProducts] = useState([]);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		fetch("http://localhost:5000/products")
			.then((res) => res.json())
			.then((data) => {
				setProducts(data);
				setDisplayProducts(data);
			});
	}, []);

	const handleFilterProduct = (item) => {
		const categoryLowerCase = item.toLowerCase();
		const matchCategoryProduct = products.filter((product) => {
			return product.brand.toLowerCase() === categoryLowerCase;
		});
		setDisplayProducts(matchCategoryProduct);
	};

	return (
		<>
			<div className="container mt-5 pt-5" id="products">
				<h2>Our Products</h2>
				<hr
					className="mx-auto"
					style={{ width: "25%", alignItems: "center", color: "black" }}
				/>
			</div>
			{products.length === 0 ? (
				<Spinner className="mt-5" animation="border" variant="success" />
			) : (
				<div className="container">
					<div class="row">
						<div class="col-12 col-md-2 mt-4">
							<ListGroup>
								<ListGroup.Item
									onClick={() => setDisplayProducts(products)}
									style={{ cursor: "pointer" }}
									action
									variant="primary"
								>
									All
								</ListGroup.Item>
								<ListGroup.Item
									onClick={() => setOpen(!open)}
									aria-controls="collapse-category-list"
									aria-expanded={open}
									style={{ cursor: "pointer" }}
									action
									variant="primary"
								>
									Categories
								</ListGroup.Item>
							</ListGroup>
							<Collapse in={open}>
								<div id="collapse-category-list">
									<ListGroup defaultActiveKey="">
										<ListGroup.Item
											onClick={() => handleFilterProduct("Apple")}
											style={{ cursor: "pointer" }}
											action
											variant="secondary"
										>
											iPhone
										</ListGroup.Item>

										<ListGroup.Item
											onClick={() => handleFilterProduct("Vivo")}
											style={{ cursor: "pointer" }}
											action
											variant="secondary"
										>
											Vivo
										</ListGroup.Item>

										<ListGroup.Item
											onClick={() => handleFilterProduct("Samsung")}
											style={{ cursor: "pointer" }}
											action
											variant="secondary"
										>
											Samsung
										</ListGroup.Item>

										<ListGroup.Item
											onClick={() => handleFilterProduct("Xiaomi")}
											style={{ cursor: "pointer" }}
											action
											variant="secondary"
										>
											Xiaomi
										</ListGroup.Item>

										<ListGroup.Item
											onClick={() => handleFilterProduct("Oppo")}
											style={{ cursor: "pointer" }}
											action
											variant="secondary"
										>
											Oppo
										</ListGroup.Item>

										<ListGroup.Item
											onClick={() => handleFilterProduct("Realme")}
											style={{ cursor: "pointer" }}
											action
											variant="secondary"
										>
											Realme
										</ListGroup.Item>

										<ListGroup.Item
											onClick={() => handleFilterProduct("Huawei")}
											style={{ cursor: "pointer" }}
											action
											variant="secondary"
										>
											Huawei
										</ListGroup.Item>
									</ListGroup>
								</div>
							</Collapse>
						</div>
						<div class="col-12 col-md-10">
							<div className="row">
								{displayProducts.slice(0, 6).map((product, index) => (
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
					</div>
				</div>
			)}
			<NavLink to="/explore-products" className={"text-decoration-none"}>
				<button className="btn btn-grad my-5 mx-auto">
					<i className="fas fa-chevron-right"></i>
					<i className="fas fa-chevron-right"></i> Explore
				</button>
			</NavLink>
		</>
	);
}
