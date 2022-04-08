import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import './signUp.css';
import BasicModal from "../modalPassword";
import PasswordStrengthBar from "react-password-strength-bar";
import axios from "axios";


// function for the 'login' part
export default function SignUp() {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [email, setEmail] = useState('');

    // function to update the text from the 'username' input  
    const handleChangeUsername = e => {
        setName(e.target.value);
    };

    // function to update the text from the 'password' input  
    const handleChangePassword = e => {
        setPassword(e.target.value);
    };

    // function to update the text from the 'repete password' input  
    const handleChangePassword2 = e => {
        setPassword2(e.target.value);
    };

    // function to update the text from the 'email' input  
    const handleChangeEmail = e => {
        setEmail(e.target.value);
    };

    // function to make a post request when the username and password are introduced 
    const handleClick = e => {
        e.preventDefault();

        // capture the user input
        // const user = {
        //     name: name,
        //     password: password
        // }

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
        <div className="signup__main-container">
            <h1> Kite</h1>

            {/* description for the first input */}
            <div className="signup__username"> Username:</div>

            {/* text filed for the username input */}
            <TextField
                required
                className="signup__input"
                label="Username"
                variant="outlined"
                value={name}
                onChange={handleChangeUsername} />

            {/* description for the second input */}
            <div className="signup__password"> Password:</div>

            {/* text filed for the password input */}
            <TextField
                required
                className="signup__input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                value={password}
                onChange={handleChangePassword}
            />

            {/* component that shows how strong the password introduced by the user is */}
            {/* <PasswordStrengthBar password={password} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} /> */}
            <div style={{ marginTop: '20px', display: 'flex', justifyContent:'center'}}>
                <PasswordStrengthBar password={password} style={{width: '200px'}} />
            </div>

            {/* description for the third input */}
            <div className="signup__password"> Repete password:</div>

            {/* text filed for the 'repete password' input */}
            <TextField
                required
                className="signup__input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                value={password2}
                onChange={handleChangePassword2}
            />

            {/* description for the fourth input */}
            <div className="signup__email"> E-mail:</div>

            {/* text filed for the email input */}
            <TextField
                required
                className="signup__input"
                label="Email"
                type="email"
                variant="outlined"
                value={email}
                onChange={handleChangeEmail}
            />

            <BasicModal password={password} password2={password2} email={email} />

            {/* the login button */}
            <div>
                <button className="signup__button"
                    onClick={handleClick} // when the user clickes the 'signup' button, 
                    // they are redirected to the 'dashboard' page

                    // if one of the text fields is not completed or the password input is different from the 'repet password' input,
                    // then the user cand not sign up ('sigup' button is disabled)
                    disabled={name === '' || password === '' || password2 === '' || email === '' || (password !== password2) ? true : false}

                    // styled added on the button accordingly to the conditions mentioned before
                    style={{
                        backgroundColor: name === '' || password === '' || password2 === '' || email === '' || (password !== password2) ? 'grey' : 'rgb(79, 144, 230)', // the color of the button will be grey if
                        borderColor: name === '' || password === '' || password2 === '' || email === '' || (password !== password2) ? 'grey' : 'rgb(79, 144, 230)'  // the button is disabled, and it will turn blue when it is abled 
                    }}>
                    Sign up</button>
            </div>

        </div >
    );
}
