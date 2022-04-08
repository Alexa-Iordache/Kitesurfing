import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import './signUp.css';
import BasicModal from "../modalPassword";
import axios from "axios";
import { Link } from "react-router-dom";


// function for the 'login' part
export default function SignUp() {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [email, setEmail] = useState('');
    const [showModal , setShowModal] = useState(false);

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

     // function to update the text from the 'repete password' input  
     const handleChangePassword2 = e => {
        setPassword2(e.target.value);
        // if (password !== password2) {
        //     setShowModal(true);
        //     console.log(showModal);
        // }
        //console.log(showModal);
    };

     // function to update the text from the 'email' input  
     const handleChangeEmail = e => {
        setEmail(e.target.value);
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

            <div className="signup__password"> Repete password:</div>

            <TextField
                required
                className="signup__input"
                label="Password2"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                value={password2}
                onChange={handleChangePassword2}
            />


            <div className="signup__email"> E-mail:</div>

            <TextField
                required
                className="signup__input"
                label="Email"
                type="email"
                variant="outlined"
                value={email}
                onChange={handleChangeEmail}
            />


            {/* the login button */}
            <div>
                <button className="signup__button"
                    onClick={handleClick} // when the user clickes the 'login' button, 
                    // they are redirected to the 'dashboard' page
                    disabled={name === '' || password === '' ? true : false} // if username or password is not written, 
                    // then the user can not log in (the 'login' button is disabled) 
                    style={{
                        backgroundColor: name === '' || password === '' || password2 === '' || email === '' ? 'grey' : 'rgb(79, 144, 230)', // the color of the button will be grey if
                        borderColor: name === '' || password === '' || password2 === '' || email === '' ? 'grey' : 'rgb(79, 144, 230)'  // the button is disabled, and it will turn blue when it is abled 
                    }}>
                    Sign up</button>
            </div>

            {/* {password !== password2 ? <BasicModal/> : null} */}
            <BasicModal password={password} password2 = {password2}/>
            
        </div >
    );
}
