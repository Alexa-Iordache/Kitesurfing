import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import './filter.css';
import axios from "axios";

// function for filtering the spots based on country and wind probability
export default function Filter() {

    const [spots, setSpots] = useState([]);
    const [filtredSpots, setFiltredSpots] = useState([]);
    const [country, setCountry] = useState('');
    const [windProb, setWindProb] = useState(0);

    // fetching the data from the JSON file
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get('https://5ddbb358041ac10014de140b.mockapi.io/spot');
            setSpots(request.data);
            return request;
        }
        fetchData();
    }, []);


    // set the country written in the text field
    const handleCountry = (e) => {
        setCountry(e.target.value);
        //console.log(country);
    }
    
    // set the wind probability written in the text field
    const handleWindProb = (e) => {
        setWindProb(e.target.value);
        //console.log(typeof(e.target.value, 10));
    }
    
    // function that retains the spots that satisfy the conditions in an array named 'filtredSpots'
    function handleSpot(e) {
        spots.map((spot) => (
            (spot.country === country) || (spot.probability == windProb)
                ? setFiltredSpots(spot)
                : null
        ))
        console.log(filtredSpots);
    }


    return (
        <div className="filter__main-container">
            <div className="filter__second-container">
                <TextField
                    label="Country"
                    variant="filled"
                    onChange={handleCountry}
                />
                <TextField
                    label="Wind Probability"
                    variant="filled"
                    onChange={handleWindProb}
                />

                <button className="filter__button" onClick={handleSpot}>APPLY FILTER</button>
            </div>

        </div>
    );
}