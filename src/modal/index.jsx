import React, { useState } from "react";
import { Marker, Popup } from 'react-leaflet';
import { WiDegrees } from 'react-icons/wi';
import { AiOutlinePlus } from 'react-icons/ai';
import L from 'leaflet';


// function to display details about the location the user clicks on
export default function DetailsPage(props) {

    const spot = props.spotNeeded;
    const [favSpots, setFavSpots] = useState([]);

    var greenIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    const changeColor = (spot) => {
        <Marker
            key={spot.id}
            position={[spot.lat, spot.long]}
            // eventHandlers={{
            //     click: (e) => {
            //         console.log('marker clicked', e);
            //     },
            // }}
        >
        </Marker>
    }

    const handleAddFavButton = (spot) => {
        console.log("added to favorite");
        setFavSpots(spot);
        changeColor(spot);
        // console.log(spot);

    }


    return (
        <div>
            <Popup>
                <div>
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
                    <button className="popup__button" onClick={() => handleAddFavButton(spot)}><span><AiOutlinePlus style={{ color: 'white' }} /></span> <span>ADD TO FAVORITES</span></button>
                </div>
            </Popup>


            {/* <Marker
                key={spot.id}
                position={[spot.lat, spot.long]}
                eventHandlers={{
                    click: (e) => {
                        console.log('marker clicked', e);
                    },
                }}
                icon={greenIcon}
            >
            </Marker> */}

        </div>
    )
}