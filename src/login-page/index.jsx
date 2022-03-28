import React from "react";
import './login-page.css';
import TextField from "@mui/material/TextField";


export default function Login() {
    return (
        <div className="login__main-container">
            <h1> Kite</h1>
            <div className="login__username"> Please enter your username:</div>
            <TextField 
                required
                id = "username_input"
                label="Username"
                variant="filled"/>

            <div className="login__password"> Please enter your password:</div>
            <TextField 
                required
                id = "password_input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="filled"
            />
        </div>
    );
}