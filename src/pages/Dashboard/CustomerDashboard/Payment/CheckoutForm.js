import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./CheckoutForm.css";
import { useEffect } from "react";
import useAuth from "../../../../hooks/useAuth";
import { Spinner } from "react-bootstrap";
import cardImage from "../../../../images/credit-card.png";

const CheckoutForm = (myOrder) => {
	const { _id, totalOrderCost, customerName, payment } = myOrder.myOrder;

	const stripe = useStripe();
	const elements = useElements();
	const { user } = useAuth();

	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [clientSecrets, setClientSecrets] = useState("");
	const [processing, setProcessing] = useState(false);

	useEffect(() => {
		fetch("http://localhost:5000/create-payment-intent", {
			method: "POST",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify({ totalOrderCost })
		})
			.then((res) => res.json())
			.then((data) => {
				setClientSecrets(data.clientSecret);
			});
	}, [totalOrderCost]);

	const handleSubmit = async (e) => {
		// Block native form submission.
		e.preventDefault();
		if (!stripe || !elements) {
			// Stripe.js has not loaded yet. Make sure to disable
			// form submission until Stripe.js has loaded.
			return;
		}
		const card = elements.getElement(CardElement);

		if (card == null) {
			return;
		}

		setProcessing(true);
		// Use your card Element with other Stripe.js APIs
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: "card",
			card
		});

		if (error) {
			setError(error.message);
			setSuccess("");
		} else {
			setError("");
			// console.log(paymentMethod);
		}

		// payment intent
		const { paymentIntent, error: intentError } =
			await stripe.confirmCardPayment(clientSecrets, {
				payment_method: {
					card: card,
					billing_details: {
						name: customerName,
						email: user.email
					}
				}
			});
		if (intentError) {
			setError(intentError.message);
			setSuccess("");
		} else {
			setError("");
			setSuccess("Your payment processed successfully!");
			// console.log(paymentIntent);
			setProcessing(false);
			// save to database
			const payment = {
				pi: paymentIntent.id,
				payment_status: "paid",
				amount: paymentIntent.amount,
				created: paymentIntent.created,
				card: paymentMethod.card.brand,
				last4: paymentMethod.card.last4,
				transaction: paymentIntent.client_secret.slice("_secret")[0]
			};
			console.log(paymentIntent);
			const url = `http://localhost:5000/orderRequest/orderId/${_id}`;
			fetch(url, {
				method: "PUT",
				headers: {
					"content-type": "application/json"
				},
				body: JSON.stringify(payment)
			})
				.then((res) => res.json())
				.then((data) => {
					// console.log(data);
				});
		}
	};

	return (
		<div>
			{totalOrderCost && (
				<form onSubmit={handleSubmit}>
					<CardElement
						options={{
							style: {
								base: {
									fontSize: "16px",
									color: "#424770",
									"::placeholder": {
										color: "#aab7c4"
									}
								},
								invalid: {
									color: "#9e2146"
								}
							}
						}}
					/>
					<br />
					{processing ? (
						<Spinner className="my-2" animation="grow" variant="info" />
					) : (
						<div className="py-3">
							{payment?.payment_status === "paid" ? (
								<button
									disabled
									style={{ width: "300px" }}
									className="btn btn-pay mt-5 mb-2"
								>
									Pay ${totalOrderCost}
								</button>
							) : (
								<button
									type="submit"
									style={{ width: "300px" }}
									className="btn btn-pay mt-5 mb-2"
									disabled={!stripe || success}
								>
									Pay ${totalOrderCost}
								</button>
							)}

							<div className="text-center">
								{error && (
									<div className="py-3">
										<p
											style={{
												color: "red",
												lineHeight: "3px",
												textAlign: "center"
											}}
										>
											{error}{" "}
										</p>{" "}
										<p style={{ color: "red", textAlign: "center" }}>
											Please reload the page & try again
										</p>
										<button
											onClick={() => window.location.reload(false)}
											className="btn btn-primary"
										>
											Reload
										</button>
									</div>
								)}
								{success && (
									<p style={{ color: "green", textAlign: "center" }}>
										{success}
									</p>
								)}
							</div>
						</div>
					)}
					<div>
						<img
							src={cardImage}
							alt=""
							style={{
								width: "300px",
								marginTop: "5px",
								marginBottom: "10px"
							}}
						/>
					</div>
				</form>
			)}
		</div>
	);
};

export default CheckoutForm;
