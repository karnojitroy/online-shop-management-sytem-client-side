import React, { useEffect, useState } from "react";
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
import { Button, Popover } from "@mui/material";
import "./AdminDashboard.css";
import { Switch, Route, useRouteMatch, NavLink } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import ManageAllOrders from "../ManageAllOrders/ManageAllOrders";

import AddAProduct from "../AddAProducts/AddAProduct";
import MakeAnAdmin from "../MakeAnAdmin/MakeAnAdmin";
import ManageProducts from "../ManageProducts/ManageProducts/ManageProducts";
import Admins from "../Admins/Admins";

const style = {
	color: "white",
	textDecoration: "none"
};
const drawerWidth = 215;

function AdminDashboard(props) {
	const { window } = props;
	const [mobileOpen, setMobileOpen] = useState(false);
	const [orders, setOrders] = useState([]);
	const [anchorEl, setAnchorEl] = useState(null);

	const { logOut } = useAuth();
	let { path, url } = useRouteMatch();

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	useEffect(() => {
		fetch("https://floating-ocean-21128.herokuapp.com/orderRequest")
			.then((res) => res.json())
			.then((data) => setOrders(data));
	}, []);

	const newOrder = orders.filter((order) => order.status === "Pending");

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;

	const drawer = (
		<div className="alignment-dashboard-menu">
			{/* dashboard menu */}
			<Toolbar />
			<Divider />
			<NavLink to="/" style={style}>
				<i className="fas fa-home text-black ms-3"></i>{" "}
				<Button color="primary">Home</Button>
			</NavLink>
			<Divider />
			<NavLink to={`${url}`} style={style}>
				<i className="fas fa-tasks text-black ms-3"></i>{" "}
				<Button color="primary">Manage All Orders</Button>
			</NavLink>
			<Divider />
			<NavLink to={`${url}/manageProducts`} style={style}>
				<i className="fas fa-tasks text-black ms-3"></i>{" "}
				<Button color="primary">Manage Products</Button>
			</NavLink>
			<Divider />
			<NavLink to={`${url}/addProduct`} style={style}>
				<i className="fas fa-plus-square text-black ms-3"></i>{" "}
				<Button color="primary">Add A Product</Button>
			</NavLink>
			<Divider />
			<NavLink to={`${url}/makeAdmin`} style={style}>
				<i className="fas fa-user-plus text-black ms-3"></i>{" "}
				<Button color="primary">Make Admin</Button>
			</NavLink>
			<Divider />
			<NavLink to={`${url}/admins`} style={style}>
				<i className="fas fa-users text-black ms-3"></i>{" "}
				<Button color="primary">Admins</Button>
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
	//   admin dashboard
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
						Admin Dashboard
					</Typography>
					<div onClick={handleClick} className="ringBell">
						<span className="-count">{newOrder.length}</span>
					</div>
				</Toolbar>
				<Popover
					id={id}
					open={open}
					anchorEl={anchorEl}
					onClose={handleClose}
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "left"
					}}
				>
					<Typography sx={{ p: 2 }}>
						{newOrder.length} new order in pending
					</Typography>
				</Popover>
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
				<Toolbar />
				{/* nested route */}
				<Switch>
					<Route exact path={path}>
						<ManageAllOrders />
					</Route>
					<Route path={`${path}/manageProducts`}>
						<ManageProducts />
					</Route>
					<Route path={`${path}/addProduct`}>
						<AddAProduct />
					</Route>
					<Route path={`${path}/makeAdmin`}>
						<MakeAnAdmin />
					</Route>
					<Route path={`${path}/admins`}>
						<Admins />
					</Route>
				</Switch>
			</Box>
		</Box>
	);
}

AdminDashboard.propTypes = {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window: PropTypes.func
};

export default AdminDashboard;
