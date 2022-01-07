import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/system";
import { Divider } from "@mui/material";
import Rating from "react-rating";
import "./ReviewHome.css";

// this page || component will display all review in home page
export default function ReviewHome() {
	const [reviews, setReviews] = React.useState([]);
	const [users, setUsers] = React.useState([]);

	React.useEffect(() => {
		fetch("http://localhost:5000/reviews")
			.then((res) => res.json())
			.then((data) => setReviews(data));
	}, []);

	React.useEffect(() => {
		fetch("http://localhost:5000/users")
			.then((res) => res.json())
			.then((data) => setUsers(data));
	}, []);

	// filter using for loop to match the review email with user's
	// email and store into an array to display all user review with name and photo. This is because of review and users collections are different.
	const getReviewWithUserNamePhoto = [];

	for (const r of reviews) {
		for (const u of users) {
			if (r?.email === u?.email) {
				const match = {
					comment: r?.comment,
					rating: r?.ratings,
					photo: u?.photoURL,
					name: u?.displayName,
					date: r?.date
				};
				getReviewWithUserNamePhoto.push(match);
			}
		}
	}
	// console.log(getReviewWithUserNamePhoto);
	return (
		<>
			<div className="row pb-5">
				{getReviewWithUserNamePhoto.length === 0 ? (
					<h5 className="mt-5">No reviews</h5>
				) : (
					getReviewWithUserNamePhoto.map((review, index) => (
						<div className=" col-sm-1 col-lg-4 g-4" key={index}>
							<List sx={{ width: "100%", bgcolor: "background.paper" }}>
								<ListItem alignItems="flex-start">
									<ListItemAvatar>
										<Avatar alt="Remy Sharp" src={review?.photo} />
									</ListItemAvatar>
									<ListItemText
										primary={review?.name}
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
										initialRating={review?.rating}
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
						</div>
					))
				)}
			</div>
		</>
	);
}
