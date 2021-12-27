import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Redirect, Route } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';


// this is private route
const PrivateRoute = ({ children, ...rest }) => {
    let { user, isLoading } = useAuth();

    if (isLoading) {
        return <Spinner className="my-5" animation="border" variant="success" />
    }
    return (
        <Route
            {...rest}
            render={({ location }) =>
                user.email ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;