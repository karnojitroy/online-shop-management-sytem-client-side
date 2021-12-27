import { Alert } from '@mui/material';
import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import Navigation from '../../Shared/Navigation/Navigation';


const alertStyle = {
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto'
}

// user log in page
const Login = () => {
    const [loginData, setLoginData] = useState({});
    const { user, loginUserWithEmailPassword, signInWithGoogle, isLoading, authError } = useAuth();

    const location = useLocation();
    const history = useHistory();

    const handleOnBlur = e => {

        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData)
    }
    //handle log in using email password
    const handleLogin = e => {
        loginUserWithEmailPassword(loginData.email, loginData.password, location, history);
        e.preventDefault();
    }
    // handle login using google
    const handleSignInWithGoogle = () => {
        signInWithGoogle(location, history)

    }

    return (
        <div>
            <Navigation></Navigation>
            <div className="container">
                <p className="mt-5"><b>Log In</b></p>
                <div className="mb-5">

                    {/* register form */}
                    {!isLoading && <form onSubmit={handleLogin}>
                        <br />
                        <div className="mb-3">
                            <input
                                type="email"
                                name="email"
                                onBlur={handleOnBlur}
                                style={{ width: "300px" }}
                                className="form-control mx-auto"
                                id="exampleFormControlInput1"
                                placeholder="Your Email" />
                        </div>
                        <div className="mb-3">
                            <input type="password"
                                name="password"
                                onBlur={handleOnBlur}
                                style={{ width: "300px" }}
                                className="form-control mx-auto"
                                id="exampleFormControlInput1"
                                placeholder="Your Password" />
                        </div>
                        <button
                            type="submit"
                            style={{ width: "300px" }}
                            className="btn btn-primary mx-auto"

                        >Login</button>
                    </form>}
                    {/* Spinner */}
                    {isLoading && <Spinner className="my-5" animation="border" variant="success" />}

                    <p className="mt-3"><b>New User?
                        <NavLink to='/register'
                            className="text-decoration-none"
                        > Register Now</NavLink>
                    </b> </p>
                    <p><b>Or</b></p>
                    <button
                        type="submit"
                        style={{ width: "300px" }}
                        className="btn btn-primary mx-auto"
                        onClick={handleSignInWithGoogle}
                    >Sign in With Google</button>
                </div>
                {/* success and error alert */}
                {user?.email && <Alert
                    severity="success"
                    style={alertStyle} >
                    Account created successfully!</Alert>}
                {authError && <Alert severity="error" style={alertStyle}>{authError}</Alert>
                }
                <br />
            </div>
        </div>
    );
};

export default Login;