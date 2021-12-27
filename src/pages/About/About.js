import React from "react";
import "./About.css";
import owner from "../../images/owner.jpg";
const About = () => {
	return (
		// About page
		<div className="container my-5 py-5 " id="about">
			<h2>About Us</h2>
			<hr
				className="mx-auto"
				style={{ width: "25%", alignItems: "center", color: "black" }}
			/>
			<div className="row my-5 ">
				<div className=" col-sm-1 col-lg-5 g-4">
					<img src={owner} alt="" className="fluid w-75" />
				</div>
				<div className=" col-sm-1 col-lg-7 g-4">
					<p className="textAlign ps-5">
						We provide the best products & services,we strive to utilize the
						power of the internet in its highest peak to fulfil the needs of
						your busy life. We cover whole Bangladesh right now and still,
						anyone from outside of Bangladesh can purchase products online
						providing a Bangladeshi shipping address.Be comfy to experience the
						best shopping experience from us.
						<br /> <br />
						the process is called business-to-business (B2B) online shopping.A
						typical online store enables the customer to browse the firm's range
						of products and services, view photos or images of the products,
						along with information about the product specifications, features
						and prices
					</p>
				</div>
			</div>
		</div>
	);
};

export default About;
