import React from "react";
import { Spinner } from "react-bootstrap";
import useAuth from "../../../hooks/useAuth";
import About from "../../About/About";
import Contact from "../../Contact/Contact";
import Footer from "../../Shared/Footer/Footer";
import Navigation from "../../Shared/Navigation/Navigation";
import Slider from "../../Shared/Slider/Slider";
import Products from "../Products/Products";
import Reviews from "../Reviews/Reviews/Reviews";

const Home = () => {
	const { isLoading } = useAuth();
	if (isLoading) {
		return <Spinner className="my-5" animation="border" variant="primary" />;
	}
	return (
		<div id="home">
			<Navigation></Navigation>
			<Slider></Slider>
			<Products></Products>
			<Reviews></Reviews>
			<About></About>
			<Contact></Contact>
			<Footer></Footer>
		</div>
	);
};

export default Home;
