import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import ReviewsIcon from "@mui/icons-material/Reviews";
import { Switch, Route, useRouteMatch, NavLink } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import MyOrders from "../MyOrders/MyOrders";
import Payment from "../Payment/Payment";
import Review from "../Review/Review";
import CustomerProfile from "../CustomerProfile/CustomerProfile";

//  This is customer dashboard
const style = {
	color: "white",
	textDecoration: "none"
};
const drawerWidth = 215;

function CustomerDashboard(props) {
	const { window } = props;
	const [mobileOpen, setMobileOpen] = useState(false);
	const { logOut } = useAuth();
	let { path, url } = useRouteMatch();

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const drawer = (
		<div className="alignment-dashboard-menu">
			{/* Customer dashboard menu */}
			<Toolbar />
			<Divider />
			<NavLink to="/" style={style}>
				<i className="fas fa-home text-black ms-3"></i>{" "}
				<Button color="primary">Home</Button>
			</NavLink>
			<Divider />
			<NavLink to={`${url}/my-account`} style={style}>
				<i className="fas fa-user text-black ms-3"></i> {"  "}
				<Button color="primary">My Account</Button>
			</NavLink>
			<Divider />
			<NavLink to={`${url}`} style={style}>
				<i className="fas fa-shopping-cart text-black ms-3"></i>{" "}
				<Button color="primary">My Orders</Button>
			</NavLink>
			<Divider />
			<NavLink to={`${url}/review`} style={style}>
				<ReviewsIcon sx={{ color: "black", marginLeft: 2, fontSize: 18 }} />{" "}
				{""}
				<Button color="primary">Service Review</Button>
			</NavLink>
			<Divider />
			<i className="fas fa-sign-out-alt text-black ms-3"></i>{" "}
			<Button onClick={logOut} color="primary">
				Log Out
			</Button>
			<Divider />
		</div>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar
				position="fixed"
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` }
				}}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: "none" } }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div">
						Customer Dashboard
					</Typography>
				</Toolbar>
			</AppBar>
			<Box
				component="nav"
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label="mailbox folders"
			>
				<Drawer
					container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true // Better open performance on mobile.
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth
						}
					}}
				>
					{drawer}
				</Drawer>
				<Drawer
					variant="permanent"
					sx={{
						display: { xs: "none", sm: "block" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth
						}
					}}
					open
				>
					{drawer}
				</Drawer>
			</Box>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					p: 3,
					width: { sm: `calc(100% - ${drawerWidth}px)` }
				}}
			>
				{/* nested route */}
				<Toolbar />
				<Switch>
					<Route exact path={path}>
						<MyOrders />
					</Route>
					<Route path={`${path}/my-account`}>
						<CustomerProfile />
					</Route>
					<Route path={`${path}/payment/:orderId`}>
						<Payment />
					</Route>
					<Route path={`${path}/review`}>
						<Review />
					</Route>
				</Switch>
			</Box>
		</Box>
	);
}

CustomerDashboard.propTypes = {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window: PropTypes.func
};

export default CustomerDashboard;
