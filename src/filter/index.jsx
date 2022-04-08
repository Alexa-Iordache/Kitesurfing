import React, { useState } from "react";
import { TextField } from "@mui/material";
import './filter.css';

// function for filtering the spots based on country and wind probability
// this filter shos the filtered spots ONLY in the console
export default function Filter(props) {

    const spots = props.vector;
    const [filtredSpots, setFiltredSpots] = useState([]);
    const [country, setCountry] = useState('');
    const [windProb, setWindProb] = useState(0);


    // set the country written in the text field
    const handleCountry = (e) => {
        setCountry(e.target.value);
    }

    // set the wind probability written in the text field
    const handleWindProb = (e) => {
        setWindProb(e.target.value);
    }

    // function that retains the spots that satisfy the conditions in an array named 'filtredSpots'
    function handleSpot(e) {
        spots.map((spot) => (
            (spot.country === country && spot.probability == windProb)
                ? setFiltredSpots(spot)
                : null
        ))
        console.log(filtredSpots);
    }


    return (
        <div className="filter__main-container">
            <div className="filter__second-container">
 
               {/* text filed for writing the country the spot is wanted to be from  */}
                <TextField
                    label="Country"
                    variant="filled"
                    onChange={handleCountry}
                />

                {/* text filed for writing the wind probaility the spot is wanted to have */}
                <TextField
                    label="Wind Probability"
                    variant="filled"
                    onChange={handleWindProb}
                />

                {/* the button for appling the filter on the spots list */}
                <button className="filter__button" onClick={handleSpot}>APPLY FILTER</button>
            </div>

        </div>
    );
}
