import React from "react";
import { Marker, Popup } from 'react-leaflet';
import { WiDegrees } from 'react-icons/wi';
import { AiOutlinePlus } from 'react-icons/ai';
import { AiOutlineMinus } from 'react-icons/ai';
import './modal.css';
import image1 from './images/star-off.png';
import image2 from './images/star-on.png';

// function to display details about the location the user clicks on
export default function DetailsPage(props) {

    const spot = props.spotNeeded; // we add in 'spot' variable, the spot received from 'props'
    const yellowIcon = props.yellowIcon;

    // function that add to 'favorites' list a spot (when the button 'add to favorites' is clicked on) 
    function handleAddFavButton(spot) {
        props.addToFavorites(spot);
        spot.favorite = true;
    }

    // function that revome from 'favorites' list a spot (when the button 'remove from favorites' is clicked on) 
    const handleRemoveFavButton = (spot) => {
        console.log("removed from favorite");
        spot.favorite = false;
    }

    return (
        <div>
            <Popup className="popup">
                
                {/* displaying the info about the spot in the popup */}
                <div className="popup__main-container">
                {spot.favorite === true // if the spot is on favorite list, there will be a yellow start right next to its name
                        ? <div className="popup__name"><img src={image2} className="detailsPage__star-image" /> <span>{spot.name}</span></div>
                        :  <div className="popup__name"><img src={image1} className="detailsPage__star-image" /> <span>{spot.name}</span></div>
                    }
                    <div className="popup__country">{spot.country}</div>
                    <div className="popup__first-title">WIND PROBABILITY</div>
                    <div className="popup__windProb"><span>{spot.probability}</span><span>%</span></div>
                    <div className="popup__title">LATITUDE</div>
                    <div className="popup__lat">{spot.lat}<WiDegrees />N</div>
                    <div className="popup__title">LONGITUDE</div>
                    <div className="popup__long">{spot.long}<WiDegrees />W</div>
                    <div className="popup__title">WHEN TO GO</div>
                    <div className="popup__month">{spot.month}</div>

                    {/* if the spot is not on favorite list, there will be the 'add to favorite' button */}
                    {/* of the spot is already on teh favorite list, there will be the 'remove fro favorites' button */}
                    {spot.favorite === true
                        ? (<button className="popup__button-remove" onClick={() => handleRemoveFavButton(spot)}><span><AiOutlineMinus style={{ color: 'white' }} /></span> <span>REMOVE FROM FAVORITES</span></button>)
                        : <button className="popup__button" onClick={() => handleAddFavButton(spot)}><span><AiOutlinePlus style={{ color: 'white' }} /></span> <span>ADD TO FAVORITES</span></button>
                    }

                    {/* if the spot is not on favorite list, there will be marked on the map with a normal, blue marker */}
                    {/* of the spot is already on teh favorite list, there will be marked on the map with a yellow marker */}
                    {spot.favorite === true 
                    ?  <Marker position={[spot.lat, spot.long]} icon={yellowIcon}></Marker>
                    :  <Marker position={[spot.lat, spot.long]}></Marker>}
                </div>
            </Popup>
        </div>
    )
}