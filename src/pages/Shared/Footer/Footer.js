import React from "react";
import "./Footer.css";
const Footer = () => {
	return (
		// This footer for all page
		<div className="footer">
			<div className="container">
				<div className="row row-cols-1 row-cols-sm-2 row-cols-md-5">
					<div className="col-md-4  text-start">
						<h5 className="mb-4">About Us</h5>
						<p>
							We are providing best products and best service. Our products are
							only various top brand smartphones
						</p>
					</div>
					<div className="col-md-2"></div>
					<div className="col-md-2 footer-contact">
						<h5 className="mb-4">Contact</h5>
						<ul>
							<li>
								<p>+88011111101</p>
							</li>
							<hr style={{ width: "100%" }} />
							<li>
								<p>+88011111110</p>
							</li>
							<hr />
							<li>
								<p>karnojitroy@gamil.com</p>
							</li>
							<hr />
						</ul>
					</div>
					{/* Social media */}
					<div className="col-md-4  social-media">
						<p className="pb-3">Follow us</p>
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
						<br />
						<br />
					</div>
				</div>
			</div>
			<div>
				<hr />
				<span> Copyright &copy; 2021 KR Mobile Mart</span>
			</div>
		</div>
	);
};

export default Footer;
