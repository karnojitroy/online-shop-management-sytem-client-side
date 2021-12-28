import Button from "@restart/ui/esm/Button";
import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import useAuth from "../../../hooks/useAuth";
import "./Navigation.css";
import logo from "../../../images/logo.png";
import avatar from "../../../images/user.png";
const menuActiveStyle = {
	fontWeight: "bold",
	color: "black"
};
const Navigation = () => {
	const { user, logOut } = useAuth();
	return (
		// header main menu
		<>
			<Navbar
				collapseOnSelect
				expand="lg"
				className="bg py-3"
				variant="light"
				sticky="top"
			>
				<Container>
					<Navbar.Brand href="/home" className="text-black">
						<img src={logo} alt="" width="50" />
						<b>Mobile Mart</b>
					</Navbar.Brand>
					<NavLink className="serach" to="/explore-products#searchArea">
						<i class="fas fa-search"></i>
					</NavLink>
					<Navbar.Toggle />
					<Navbar.Collapse className="justify-content-end">
						<Nav.Link
							as={NavHashLink}
							to="/home#home"
							className="text-black"
							activeStyle={menuActiveStyle}
						>
							Home
						</Nav.Link>
						<Nav.Link
							as={NavHashLink}
							to="/home#about"
							className="text-black"
							activeStyle={menuActiveStyle}
						>
							About
						</Nav.Link>
						<Nav.Link
							as={NavHashLink}
							to="/explore-products#explore"
							className="text-black"
							activeStyle={menuActiveStyle}
						>
							Explore Products
						</Nav.Link>
						<Nav.Link
							as={NavHashLink}
							to="/home#contact"
							className="text-black"
							activeStyle={menuActiveStyle}
						>
							Contact
						</Nav.Link>
						{user?.email && (
							<Nav.Link
								as={NavHashLink}
								to="/dashboard"
								className="text-black"
								activeStyle={menuActiveStyle}
							>
								Dashboard
							</Nav.Link>
						)}
						{user?.email ? (
							<div>
								<Button
									onClick={logOut}
									className="btn btn-warning ms-4 text-white"
								>
									Logout
								</Button>
								<>
									{user.photoURL === null ? (
										<img
											src={avatar}
											alt=""
											style={{
												height: "30px",
												width: "30px",
												marginLeft: "4px",
												marginRight: "2px",
												borderRadius: "50px"
											}}
										/>
									) : (
										<img
											src={user.photoURL}
											alt=""
											style={{
												height: "30px",
												width: "30px",
												marginLeft: "4px",
												marginRight: "2px",
												borderRadius: "50px"
											}}
										/>
									)}

									{user.displayName}
								</>
							</div>
						) : (
							<Nav.Link as={NavLink} to="/login" activeStyle={menuActiveStyle}>
								Log in
							</Nav.Link>
						)}
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};

export default Navigation;
