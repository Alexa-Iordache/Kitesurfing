import React, { useState } from "react";
import { Popup } from 'react-leaflet';
import { WiDegrees } from 'react-icons/wi';
import { AiOutlinePlus } from 'react-icons/ai';
import { AiOutlineMinus } from 'react-icons/ai';
import './modal.css';


// function to display details about the location the user clicks on
export default function DetailsPage(props) {

    const spot = props.spotNeeded;
    const [favSpots, setFavSpots] = useState([]);

    const handleAddFavButton = (spot) => {
        console.log("added to favorite");
        setFavSpots(spot);
    }

    const handleRemoveFavButton = (spot) => {
        console.log("removed from favorite");
        //setFavSpots(spot);
    }


    return (
        <div>
            <Popup className="popup">
                <div className="popup__main-container">
                    <div className="popup__name">{spot.name}</div>
                    <div className="popup__country">{spot.country}</div>
                    <div className="popup__first-title">WIND PROBABILITY</div>
                    <div className="popup__windProb"><span>{spot.probability}</span><span>%</span></div>
                    <div className="popup__title">LATITUDE</div>
                    <div className="popup__lat">{spot.lat}<WiDegrees />N</div>
                    <div className="popup__title">LONGITUDE</div>
                    <div className="popup__long">{spot.long}<WiDegrees />W</div>
                    <div className="popup__title">WHEN TO GO</div>
                    <div className="popup__month">{spot.month}</div>
                    {spot.favorite === true 
                    ?  <button className="popup__button-remove" onClick={() => handleRemoveFavButton(spot)}><span><AiOutlineMinus style={{ color: 'white' }} /></span> <span>REMOVE FROM FAVORITES</span></button>
                    :  <button className="popup__button" onClick={() => handleAddFavButton(spot)}><span><AiOutlinePlus style={{ color: 'white' }} /></span> <span>ADD TO FAVORITES</span></button>
                    }
                </div>
            </Popup>
        </div>
    )
}