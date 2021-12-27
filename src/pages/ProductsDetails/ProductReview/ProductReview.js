import React, { useEffect, useState } from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import { FaStar } from "react-icons/fa";
import swal from "sweetalert";
import useAuth from "../../../hooks/useAuth";
import "./ProductReview.css";
import Rating from "react-rating";
import avatar from "../../../images/user.png";

export default function ProductReview(props) {
	const { productId } = props;
	const { user, admin, isLoading } = useAuth();
	const [comment, setComment] = useState("");
	const [product, setProduct] = useState([]);
	const [dispalyComment, setDisplayComment] = useState([]);
	const [productReviews, setProductReviews] = useState([]);
	const [currentRatingValue, setCurrentRatingValue] = useState(0);
	const [hoverValue, setHoverValue] = useState(undefined);
	const stars = Array(5).fill(0);
	// handle rating bar
	const handleClick = (value) => {
		setCurrentRatingValue(value);
	};
	const handleMouseOver = (newHoverValue) => {
		setHoverValue(newHoverValue);
	};

	const handleMouseLeave = () => {
		setHoverValue(undefined);
	};

	// handle comment
	const handleCommentOnchange = (e) => {
		const value = e.target.value;
		setComment(value);
	};

	useEffect(() => {
		fetch(`http://localhost:5000/products/${productId}`)
			.then((res) => res.json())
			.then((data) => {
				setProduct(data);
			});
	}, [productId]);

	useEffect(() => {
		fetch(`http://localhost:5000/productReviews`)
			.then((res) => res.json())
			.then((data) => {
				setProductReviews(data);
			});
	}, []);

	const productReviewArr = productReviews.filter(
		(review) => review.productId === productId
	);

	const checkReviewer = productReviewArr.filter(
		(review) => review.email === user.email
	);
	const reviewerEmail = [];
	for (const i of checkReviewer) {
		reviewerEmail.push(i.email);
	}

	//  handle Review submit
	const handleReviewSubmit = (e) => {
		e.preventDefault();
		const productReviews = {
			productId: productId,
			email: user?.email,
			userName: user?.displayName,
			photoURL: user?.photoURL,
			ratings: currentRatingValue,
			comment,
			date: new Date().toLocaleDateString()
		};
		// const updateProduct = {
		// 	name: product.name,
		// 	img: product.img,
		// 	soldBy: product.soldBy,
		// 	stock: product.stock,
		// 	brand: product.brand,
		// 	display: product.display,
		// 	cpu: product.cpu,
		// 	memory: product.memory,
		// 	rear_camera: product.rear_camera,
		// 	front_camera: product.front_camera,
		// 	price: product.price,
		// 	color: product.color,
		// 	ratings: [currentRatingValue]
		// };
		if (productReviews.ratings === 0) {
			alert("Please give ratings");
		} else {
			if (user.email) {
				if (
					dispalyComment.email === user.email ||
					reviewerEmail[0] === user.email
				) {
					swal("Sorry!", "You can't give onec more", "error");
					return;
				} else {
					fetch("http://localhost:5000/productReviews", {
						method: "POST",
						headers: {
							"content-type": "application/json"
						},
						body: JSON.stringify(productReviews)
					})
						.then((res) => res.json())
						.then((result) => {
							if (result.insertedId) {
								if (productReviews.productId === product._id) {
									setDisplayComment(productReviews);
								}
								setCurrentRatingValue(0);
								setComment("");
								swal("Review", "Submitted", "success");
							}
						});
					// fetch(`http://localhost:5000/products/${productId}`, {
					// 	method: "PUT",
					// 	headers: {
					// 		"content-type": "application/json"
					// 	},
					// 	body: JSON.stringify(updateProduct)
					// })
					// 	.then((res) => res.json())
					// 	.then((result) => console.log(result), setCurrentRatingValue(0));
				}
			} else {
				alert("Please log in first!");
			}
		}
	};

	return (
		<div className="review-form mb-5">
			{!isLoading && !admin && (
				<form onSubmit={handleReviewSubmit}>
					{/* Rating bar  */}
					<div>
						{stars.map((_, index) => {
							return (
								<FaStar
									required
									key={index}
									size={40}
									onClick={() => handleClick(index + 1)}
									onMouseOver={() => handleMouseOver(index + 1)}
									onMouseLeave={handleMouseLeave}
									color={
										(hoverValue || currentRatingValue) > index
											? "#ffc107"
											: "#e4e5e9"
									}
									className="product-review-star"
								/>
							);
						})}
					</div>
					<br />
					<TextareaAutosize
						required
						aria-label="minimum height"
						minRows={2}
						name="comment"
						placeholder="Write your comment here..."
						style={{
							alignItems: "left",
							width: "100%"
						}}
						onChange={handleCommentOnchange}
					/>
					<br />
					<Button type="submit" variant="contained">
						Submit
					</Button>
				</form>
			)}
			{productReviewArr.length !== 0 &&
				productReviewArr.map((review, i) => (
					<ul className="mt-5" key={i}>
						<li style={{ listStyle: "none" }}>
							<div>
								{review?.photoURL ? (
									<img
										src={review?.photoURL}
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
								)}
								<span>{review?.userName}</span> <br />
								<div style={{ marginLeft: 30 }}>
									<Rating
										readOnly
										initialRating={review?.ratings}
										readonly
										fullSymbol="fas fa-star full-star"
										emptySymbol="fas fa-star empty-star"
									></Rating>
									<p>{review?.comment}</p>
								</div>
							</div>
						</li>
					</ul>
				))}
			{dispalyComment.length !== 0 && (
				<ul className="mt-5">
					<li style={{ listStyle: "none" }}>
						<div>
							{dispalyComment?.photoURL ? (
								<img src={dispalyComment?.photoURL} alt="" />
							) : (
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
							)}
							<span>{dispalyComment?.userName}</span> <br />
							<div style={{ marginLeft: 30 }}>
								<Rating
									readOnly
									initialRating={dispalyComment?.ratings}
									readonly
									fullSymbol="fas fa-star full-star"
									emptySymbol="fas fa-star empty-star"
								></Rating>
								<p>{dispalyComment?.comment}</p>
							</div>
						</div>
					</li>
				</ul>
			)}
		</div>
	);
}
