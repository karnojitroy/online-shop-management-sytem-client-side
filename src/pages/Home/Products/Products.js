import React, { useEffect, useState } from "react";
import { Col, Collapse, ListGroup, Row, Spinner } from "react-bootstrap";

import {
	BrowserRouter as Router,
	Switch,
	Route,
	useRouteMatch,
	NavLink
} from "react-router-dom";
import AllBrands from "./ProductCategory/AllBrands/AllBrands";
import ProductHome from "./ProductCategory/ProductHome/ProductHome";
import "./Products.css";

const linkStyle = {
	textDecoration: "none",
	color: "white"
};
export default function Products() {
	let { path, url } = useRouteMatch();
	const [products, setProducts] = useState([]);
	const [open, setOpen] = useState(false);
	const [displayProducts, setDisplayProducts] = useState(products);

	useEffect(() => {
		fetch("http://localhost:5000/products")
			.then((res) => res.json())
			.then((data) => setProducts(data));
	}, []);
	const handleCategory = (v) => {
		const categoryLowerCase = v.toLowerCase();
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
			{products.length === 0 && (
				<Spinner className="mt-5" animation="border" variant="success" />
			)}
			<Router>
				<Row>
					<Col xs={12} md={1}>
						<ListGroup defaultActiveKey="#all">
							<NavLink to={`${url}`} style={linkStyle}>
								<ListGroup.Item
									style={{ cursor: "pointer" }}
									action
									variant="dark"
									href="#all"
								>
									All
								</ListGroup.Item>
							</NavLink>

							<ListGroup.Item
								style={{ cursor: "pointer" }}
								action
								variant="dark"
								// href="#categories"
								onClick={() => setOpen(!open)}
								aria-controls="collapse-category-list"
								aria-expanded={open}
							>
								Category
							</ListGroup.Item>

							<Collapse in={open}>
								<div id="collapse-category-list">
									<ListGroup>
										<NavLink to={`${url}/category`} style={linkStyle}>
											<ListGroup.Item
												onClick={() => handleCategory("Apple")}
												style={{ cursor: "pointer" }}
											>
												iPhone
											</ListGroup.Item>
										</NavLink>
										<NavLink to={`${url}/category`} style={linkStyle}>
											<ListGroup.Item
												onClick={() => handleCategory("Vivo")}
												style={{ cursor: "pointer" }}
											>
												Vivo
											</ListGroup.Item>
										</NavLink>
										<NavLink to={`${url}/category`} style={linkStyle}>
											<ListGroup.Item
												onClick={() => handleCategory("Samsung")}
												style={{ cursor: "pointer" }}
											>
												Samsung
											</ListGroup.Item>
										</NavLink>
										<NavLink to={`${url}/category`} style={linkStyle}>
											<ListGroup.Item
												onClick={() => handleCategory("Xiaomi")}
												style={{ cursor: "pointer" }}
											>
												Xiaomi
											</ListGroup.Item>
										</NavLink>
										<NavLink to={`${url}/category`} style={linkStyle}>
											<ListGroup.Item
												onClick={() => handleCategory("Oppo")}
												style={{ cursor: "pointer" }}
											>
												Oppo
											</ListGroup.Item>
										</NavLink>
										<NavLink to={`${url}/category`} style={linkStyle}>
											<ListGroup.Item
												onClick={() => handleCategory("Realme")}
												style={{ cursor: "pointer" }}
											>
												Realme
											</ListGroup.Item>
										</NavLink>
										<NavLink to={`${url}/category`} style={linkStyle}>
											<ListGroup.Item
												onClick={() => handleCategory("Huawei")}
												style={{ cursor: "pointer" }}
											>
												Huawei
											</ListGroup.Item>
										</NavLink>
									</ListGroup>
								</div>
							</Collapse>
						</ListGroup>
					</Col>
					<Col xs={12} md={11}>
						<Switch>
							<Route exact path={path}>
								<ProductHome products={products} />
							</Route>
							<Route exact path={`${path}/category`}>
								<AllBrands displayProducts={displayProducts} />
							</Route>
						</Switch>
					</Col>
				</Row>
			</Router>
			<NavLink to="/explore-products" className={"text-decoration-none"}>
				<button className="btn btn-grad my-5 mx-auto">
					<i className="fas fa-chevron-right"></i>
					<i className="fas fa-chevron-right"></i> Explore
				</button>
			</NavLink>
		</>
	);
}
