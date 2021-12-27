import React from "react";
import { Carousel } from "react-bootstrap";
import "./Slider.css";
import slide1 from "../../../images/slide1.jpg";
import slide2 from "../../../images/slide2.jpg";
import slide3 from "../../../images/slide3.jpg";

const Slider = () => {
	return (
		<div>
			<Carousel>
				<Carousel.Item className="slide-h">
					<img
						className="d-block w-100"
						src={slide1}
						alt="First slide"
						height="560px"
					/>
					<Carousel.Caption className="text-warning"></Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item className="slide-h">
					<img
						className="d-block w-100"
						src={slide2}
						alt="Second slide"
						height="600px"
					/>

					<Carousel.Caption className="text-warning"></Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item className="slide-h">
					<img
						className="d-block w-100"
						src={slide3}
						alt="Third slide"
						height="600px"
					/>

					<Carousel.Caption className="text-warning"></Carousel.Caption>
				</Carousel.Item>
			</Carousel>
		</div>
	);
};

export default Slider;
