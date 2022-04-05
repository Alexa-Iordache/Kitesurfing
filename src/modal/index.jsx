import React from "react";
import { Popup } from 'react-leaflet';
import { WiDegrees } from 'react-icons/wi';
import { AiOutlinePlus } from 'react-icons/ai';
import { AiOutlineMinus } from 'react-icons/ai';
import './modal.css';

// function to display details about the location the user clicks on
export default function DetailsPage(props) {

    const spot = props.spotNeeded;
    // const greenIcon = props.yellowIcon;

    function handleAddFavButton(spot) {
        console.log("added to favorite");
        props.addToFavorites(spot);
        spot.favorite = true;
    }

    const handleRemoveFavButton = (spot) => {
        console.log("removed from favorite");
        spot.favorite = false;
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
                        ? (<button className="popup__button-remove" onClick={() => handleRemoveFavButton(spot)}><span><AiOutlineMinus style={{ color: 'white' }} /></span> <span>REMOVE FROM FAVORITES</span></button>)
                        : <button className="popup__button" onClick={() => handleAddFavButton(spot)}><span><AiOutlinePlus style={{ color: 'white' }} /></span> <span>ADD TO FAVORITES</span></button>
                    }

                    {/* {spot.favorite === true 
                    ?  (<Marker position={[spot.lat, spot.long]} icon={greenIcon}></Marker>)
                    :  <Marker position={[spot.lat, spot.long]}></Marker>} */}
                </div>
            </Popup>
            {/* {spot.favorite === true ? console.log("s a ajuns pana aici") : null} */}
        </div>
    )
}