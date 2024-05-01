import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function ProtectedRoute() {
    return (
        <Route
            render={props =>
                localStorage.getItem('token') ? (
                    <div><h1>You are logged in!</h1></div>
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
}

export default ProtectedRoute;