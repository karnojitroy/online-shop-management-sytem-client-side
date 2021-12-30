import { useEffect, useState } from "react";
import initializeFirebase from "../pages/Login/firebase/firebase.init";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signInWithPopup,
	GoogleAuthProvider,
	updateProfile,
	signOut
} from "firebase/auth";

initializeFirebase();
const useFirebase = () => {
	const [user, setUser] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [authError, setAuthError] = useState("");
	const [admin, setAdmin] = useState(false);
	const auth = getAuth();
	const googleProvider = new GoogleAuthProvider();

	const registerUser = (
		email,
		password,
		name,
		phone,
		address,
		city,
		country
	) => {
		setIsLoading(true);
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				setAuthError("");
				const newUser = {
					email,
					displayName: name,
					photoURL: "",
					phoneNumber: phone,
					address,
					city,
					country
				};
				setUser(newUser);

				//save user to the database
				saveUser(email, name, "", phone, address, city, country, "POST");
				// send name to firebase after register with email and password
				updateProfile(auth.currentUser, {
					displayName: name
				})
					.then(() => {})
					.catch((error) => {});
			})
			.catch((error) => {
				setAuthError(error.message);
			})
			.finally(() => setIsLoading(false));
	};
	// sign is with email and password
	const loginUserWithEmailPassword = (email, password, location, history) => {
		setIsLoading(true);
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const destination = location?.state?.from || "/";
				history.replace(destination);
				setAuthError("");
			})
			.catch((error) => {
				setAuthError(error.message);
			})
			.finally(() => setIsLoading(false));
	};

	// google sign in
	const signInWithGoogle = (location, history) => {
		setIsLoading(true);
		signInWithPopup(auth, googleProvider)
			.then((result) => {
				const user = result.user;
				saveUser(
					user.email,
					user.displayName,
					user.photoURL,
					user.phoneNumber,
					user?.address,
					user?.city,
					user?.county,
					"PUT"
				);
				const destination = location?.state?.from || "/";
				history.replace(destination);
				setAuthError("");
			})
			.catch((error) => {
				setAuthError(error.message);
			})
			.finally(() => setIsLoading(false));
	};

	//observe user state
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
			} else {
				setUser({});
			}
			setIsLoading(false);
		});
		return () => unsubscribe;
	}, [auth]);

	//check and set admin
	useEffect(() => {
		fetch(`http://localhost:5000/users/${user.email}`)
			.then((res) => res.json())
			.then((data) => setAdmin(data.admin));
	}, [user.email]);

	// save users into database
	const saveUser = (
		email,
		displayName,
		photoURL,
		phoneNumber,
		address,
		city,
		country,
		method
	) => {
		const user = {
			email,
			displayName,
			photoURL,
			phoneNumber,
			address,
			city,
			country
		};
		if (method === "POST" || method === "PUT" || method === "DELETE") {
			fetch("http://localhost:5000/users", {
				method: method,
				headers: {
					"content-type": "application/json"
				},
				body: JSON.stringify(user)
			}).then();
		} else {
			fetch("http://localhost:5000/users", {
				method: method,
				headers: {
					"content-type": "application/json"
				}
			}).then();
		}
	};

	// log out user
	const logOut = () => {
		signOut(auth)
			.then(() => {
				// Sign-out successful.
			})
			.catch((error) => {})
			.finally(() => setIsLoading(false));
	};

	return {
		user,
		admin,
		isLoading,
		authError,
		setIsLoading,
		registerUser,
		loginUserWithEmailPassword,
		signInWithGoogle,
		logOut
	};
};
export default useFirebase;
