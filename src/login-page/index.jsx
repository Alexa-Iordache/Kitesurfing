import React from "react";
import './login-page.css';
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";


// function for the 'login' part
export default function Login() {

    const navigate = useNavigate();

    return (
        <div className="login__main-container">
            <h1> Kite</h1>

            {/* description for the first input */}
            <div className="login__username"> Please enter your username:</div>

            {/* text filed for the username input */}
            <TextField
                required
                id="login__input"
                label="Username"
                variant="filled" />

            {/* description for the second input */}
            <div className="login__password"> Please enter your password:</div>

            {/* text filed for the password input */}
            <TextField
                required
                id="login__input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="filled"
            />

            {/* the login button */}
            {/* when the user clickes the 'login' button, they are redirected to the 'dashboard' page   */}
            <div>
                <button className="login__button" onClick={() => {navigate('/dashboard'); }}> Login</button>
            </div>
        </div>
    );
}