import Button from "@restart/ui/esm/Button";
import React from "react";
import { Form } from "react-bootstrap";
import "./Contact.css";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
const Contact = () => {
	const { register, handleSubmit, reset } = useForm();
	const onSubmit = (data) => {
		reset();
		swal("Send Successful", "I will develop it later", "success");
	};
	return (
		//  contact page
		<div className=" my-5 py-5" id="contact">
			<div className="container">
				<h2>Contact Us</h2>
				<hr
					className="mx-auto"
					style={{ width: "25%", alignItems: "center", color: "black" }}
				/>
				<div className="row my-5 ">
					<div className=" col-sm-12 col-lg-5 g-4 text-start">
						<h5 className="text-danger text-center">HOT LINE</h5>
						<hr />
						<h6 className="mt-5">
							<i className="fas fa-mobile-alt me-3"></i>
							+88011111101
						</h6>
						<h6 className="mt-3">
							<i className="fas fa-mobile-alt me-3"></i> +88011111110
						</h6>
						<h6 className="mt-3">
							<i className="fas fa-tty me-3"></i> +88090030
						</h6>
						<h6 className="mt-3">
							<i className="fas fa-tty me-3"></i> +8809003
						</h6>
						<div className="contact-social-medail">
							<a
								href="https://www.linkedin.com"
								target="_blank"
								rel="noopener noreferrer"
							>
								<i className="fab fa-linkedin"></i>
							</a>
							<a
								href="https://www.facebook.com/"
								target="_blank"
								rel="noopener noreferrer"
							>
								<i className="fab fa-facebook-square"></i>
							</a>
							<a
								href="https://www.instagram.com"
								target="_blank"
								rel="noopener noreferrer"
							>
								<i className="fab fa-instagram-square"></i>
							</a>
							<a
								href="https://m.twitter.com"
								target="_blank"
								rel="noopener noreferrer"
							>
								<i className="fab fa-twitter-square"></i>
							</a>
							<a
								href="https://www.youtube.com"
								target="_blank"
								rel="noopener noreferrer"
							>
								<i className="fab fa-youtube-square"></i>
							</a>
						</div>
					</div>
					<div className=" col-sm-12 col-lg-7 g-4 px-4">
						<Form onSubmit={handleSubmit(onSubmit)}>
							<Form.Group
								className="mb-3"
								controlId="exampleForm.ControlInput1"
							>
								<Form.Control
									type="email"
									placeholder="Your Email"
									{...register("email", { required: true, min: 1 })}
								/>
							</Form.Group>
							<Form.Group
								className="mb-3"
								controlId="exampleForm.ControlTextarea1"
							>
								<Form.Control
									as="textarea"
									rows={7}
									placeholder="Write your message....."
									{...register("messages", { required: true, min: 1 })}
								/>
							</Form.Group>
							<Button className="btn btn-primary w-100" type="submit">
								Send
							</Button>
						</Form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Contact;
