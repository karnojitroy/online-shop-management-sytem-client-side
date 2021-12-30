import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home/Home";
import AuthProvider from "./contexts/AuthProvider";
import ExploreProducts from "./pages/ExploreProducts/ExploreProducts";
import Login from "./pages/Login/Login/Login";
import Register from "./pages/Login/Register/Register";
import PrivateRoute from "./pages/Login/PrivateRoute/PrivateRoute";
import Dashboard from "./pages/Dashboard/Dashboard/Dashboard";
import NotFound from "./pages/NotFound/NotFound";
import Review from "./pages/Dashboard/CustomerDashboard/Review/Review";
import ProductsDetails from "./pages/ProductsDetails/ProductsDetails";
import OrderProduct from "./pages/ProductsDetails/OrderProduct/OrderProduct";

function App() {
	return (
		<div className="App">
			<AuthProvider>
				<Router>
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route path="/home">
							<Home />
						</Route>
						<Route path="/explore-products">
							<ExploreProducts />
						</Route>
						<Route path="/product-details/:productId">
							<ProductsDetails />
						</Route>
						<PrivateRoute path="/order-product/:productId">
							<OrderProduct />
						</PrivateRoute>
						<PrivateRoute path="/dashboard">
							<Dashboard />
						</PrivateRoute>
						<PrivateRoute path="/review">
							<Review />
						</PrivateRoute>
						<Route path="/register">
							<Register />
						</Route>
						<Route path="/login">
							<Login></Login>
						</Route>
						<Route path="*">
							<NotFound />
						</Route>
					</Switch>
				</Router>
			</AuthProvider>
		</div>
	);
}

export default App;
