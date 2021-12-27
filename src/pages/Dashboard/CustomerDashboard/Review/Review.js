import { Divider, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Navbar } from "react-bootstrap";
import Container from "@mui/material/Container";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { NavLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import useAuth from "../../../../hooks/useAuth";
import { FaStar } from "react-icons/fa";
import Rating from "react-rating";
import CircularProgress from "@mui/material/CircularProgress";
import "./Review.css";
import swal from "sweetalert";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/system";
import Alert from "@mui/material/Alert";
import logo from "../../../../images/logo.png";

// customer review page where user/ customers can the reviews and can give reviews
const brandNameStyle = {
	fontWeight: "bold",
	color: "black",
	textDecoration: "none",
	padding: "20px"
};
const Review = () => {
	const { user, isLoading } = useAuth();
	const [comment, setComment] = useState("");
	const [reviews, setReviews] = useState([]);
	const { admin } = useAuth();
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
	//  handle Review submit
	const handleReviewSubmit = (e) => {
		e.preventDefault();
		const review = {
			email: user?.email,
			ratings: currentRatingValue,
			comment,
			date: new Date().toLocaleDateString()
		};
		if (review.ratings === 0) {
			alert("Please give ratings");
		} else {
			fetch("http://localhost:5000/reviews", {
				method: "POST",
				headers: {
					"content-type": "application/json"
				},
				body: JSON.stringify(review)
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.insertedId) swal("Review", "Submitted", "success");
				});
		}

		setCurrentRatingValue(0);
		setComment("");
	};

	useEffect(() => {
		fetch(`http://localhost:5000/reviews`)
			.then((res) => res.json())
			.then((data) => {
				setReviews(data);
			});
	}, []);

	const filterReviews = reviews.filter((review) => review.email === user.email);
	// console.log(filterReviews);
	return (
		<div id="review">
			<Navbar>
				<Container sx={{ marginBottom: 5 }}>
					<NavLink to="/" style={brandNameStyle}>
						<img src={logo} alt="" width="50" />
						<b>Mobile Mart</b>
					</NavLink>
				</Container>
			</Navbar>

			<Divider />
			<Typography
				sx={{ marginBottom: 4 }}
				variant="b1"
				gutterBottom
				component="div"
			>
				<h4> Give Your Review about Our Service</h4>
				<Divider />
			</Typography>

			{admin ? (
				<Alert variant="filled" severity="error">
					This is not for admin!
				</Alert>
			) : (
				<Grid container spacing={2}>
					<Grid item xs={12} md={5} lg={5}>
						{/* Review form */}
						{!isLoading && (
							<form onSubmit={handleReviewSubmit}>
								{/* Rating bar  */}
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
											className="star"
										/>
									);
								})}
								<TextareaAutosize
									required
									aria-label="minimum height"
									minRows={5}
									name="comment"
									placeholder="Write your comment here..."
									style={{ width: "100%", marginLeft: 20 }}
									onChange={handleCommentOnchange}
								/>
								<Button type="submit" variant="contained">
									Submit
								</Button>
							</form>
						)}
						{isLoading && <CircularProgress color="success" />}
					</Grid>
					{/* Display own review in same page */}
					<Grid item xs={12} md={7} lg={7}>
						<Typography
							sx={{ marginBottom: 4, marginTop: 5, color: "gray" }}
							variant="b1"
							gutterBottom
							component="div"
						>
							{filterReviews?.length === 0
								? "You have no review"
								: `You have given ${filterReviews?.length} reviews`}
						</Typography>
						{filterReviews.map((review, index) => (
							<List
								sx={{
									width: "100%",
									maxWidth: 500,
									bgcolor: "background.paper",
									marginLeft: 5
								}}
								key={index}
							>
								<ListItem alignItems="flex-start">
									<ListItemAvatar>
										<Avatar alt="Remy Sharp" src={user?.photoURL} />
									</ListItemAvatar>
									<ListItemText
										primary={user?.displayName}
										secondary={
											<Typography
												sx={{ display: "inline" }}
												component="span"
												variant="body2"
												color="text.primary"
											>
												{review?.comment}
											</Typography>
										}
									/>
								</ListItem>
								<Box sx={{ textAlign: "left", marginLeft: "75px" }}>
									<Rating
										readOnly
										initialRating={review?.ratings}
										readonly
										fullSymbol="fas fa-star full-star"
										emptySymbol="fas fa-star empty-star"
									></Rating>
								</Box>
								<Divider variant="inset" component="li" />
								<Typography
									variant="caption"
									sx={{
										textAlign: "left",
										display: "block",
										marginLeft: "75px"
									}}
									gutterBottom
								>
									{review?.date}
								</Typography>
							</List>
						))}
					</Grid>
				</Grid>
			)}
		</div>
	);
};

export default Review;
