import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";


// function for the 'login' part
export default function SignUp() {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    // function to update the text from the 'username' input  
    const handleChangeUsername = e => {
        setName(e.target.value);
        // console.log(e.target.value);
    };

    // function to update the text from the 'password' input  
    const handleChangePassword = e => {
        setPassword(e.target.value);
        // console.log(e.target.value);
    };

    // function to make a post request when the username and password are introduced 
    const handleClick = e => {
        e.preventDefault();

        // capture the user input
        const user = {
            name: name,
            password: password
        }

        // the user input is added along with the post request, which will give a response or throw an error
        // axios.post(`https://5ddbb358041ac10014de140b.mockapi.io/login`, { user })
        //     .then (response => {
        //         console.log(response);
        //         console.log(response.data);
        //     })
        //     .catch( error => {
        //         if (error.response) {
        //             console.log("eroare");
        //         }
        //     })
        navigate('/dashboard');
    }

    return (
        <div className="login__main-container">
            <h1> Kite</h1>

            {/* description for the first input */}
            <div className="login__username"> Username:</div>

            {/* text filed for the username input */}
            <TextField
                required
                className="login__input"
                label="Username"
                variant="filled"
                value={name}
                onChange={handleChangeUsername} />

            {/* description for the second input */}
            <div className="login__password"> Password:</div>

            {/* text filed for the password input */}
            <TextField
                required
                className="login__input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="filled"
                value={password}
                onChange={handleChangePassword}
            />

            <div className="login__password"> Repete password:</div>

            <TextField
                required
                className="login__input"
                label="Password2"
                type="password"
                autoComplete="current-password"
                variant="filled"
                value={password}
                onChange={handleChangePassword}
            />

            <div className="login__password"> E-mail:</div>

            <TextField
                required
                className="login__input"
                label="Email"
                type="email"
                // autoComplete="current-password"
                variant="filled"
                value={password}
                onChange={handleChangePassword}
            />

            {/* the login button */}
            <div>
                <button className="login__button"
                    onClick={handleClick} // when the user clickes the 'login' button, 
                    // they are redirected to the 'dashboard' page
                    disabled={name === '' || password === '' ? true : false} // if username or password is not written, 
                    // then the user can not log in (the 'login' button is disabled) 
                    style={{
                        backgroundColor: name === '' || password === '' ? 'grey' : 'rgb(79, 144, 230)', // the color of the button will be grey if
                        borderColor: name === '' || password === '' ? 'grey' : 'rgb(79, 144, 230)'  // the button is disabled, and it will turn blue when it is abled 
                    }}>
                    Sign up</button>
            </div>
        </div>
    );
}
