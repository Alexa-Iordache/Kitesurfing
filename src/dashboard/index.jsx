import React, { useEffect, useState } from "react";
import './dashboard.css';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import axios from "axios";
import { TextField } from "@mui/material";
import { BiSearch } from 'react-icons/bi';
import InputAdornment from '@mui/material/InputAdornment';
import Filter from "../filter";
import image1 from './images/filter.png';
import L from 'leaflet';
import DetailsPage from "../modal";
import SortTable from "../sortCol";
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

    const [spots, setSpots] = useState([]);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [buttonDisplayed, setButtonDisplayed] = useState(true);
    const [favSpots, setFavSpots] = useState([]);
    const [inputText, setInputText] = useState('');
    const [logOut, setLogOut] = useState(false);
    const navigate = useNavigate();


    var greenIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    var blueIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    // get the information about the spots from JSON and put them in 'spots'
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get('https://5ddbb358041ac10014de140b.mockapi.io/spot');
            for (const obj of request.data) {
                obj.favorite = false;    // attribute 'favorite' helps us to know if the spot is on the favorite list or no
            }
            setSpots(request.data);
            console.log(request.data);
            return request;
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get('https://5ddbb358041ac10014de140b.mockapi.io/favourites');
            for (const obj of request.data) {
                obj.favorite = true;    // attribute 'favorite' helps us to know if the spot is on the favorite list or no
            }
            setFavSpots(request.data);
            console.log(request.data);
            //return request;
        }
        fetchData();
    }, []);

    const handleFilterButtonClick = (e) => {
        setButtonClicked(true);
        setButtonDisplayed(false);
        console.log(spots);
    }

    // we change the spots' 'favorite' attribute to 'true' if that spot is on the list with favorites
    for (var i = 0; i < spots.length; i++){
        for (var j = 0; j < favSpots.length; j++){
            if (spots[i].id == parseInt(favSpots[j].spot))
            {
                spots[i].favorite = true;
            }
        }
    }

    // favorite spots added in the list
    const addToFavorites = (spot) => {
        for (const s of spots)
        {
            if (s.id === spot.id)
            {
                s.favorite = true;
                break;
            }
        }
    }

    // function for handlering the input of the searching bar
    const inputHandler = (e) => {
        e.preventDefault();
        var lowerCase = e.target.value.toLowerCase();   // the letters in the input are all transformed into lowercase letters
        setInputText(lowerCase);
        // console.log(lowerCase);
    }

    const handleClickUserButton = (e) => {
        console.log("butonul a fost apasat");
        setLogOut(true);
    } 

    const handleLogOutButton = (e) => {
        console.log("butonul de log out a fost apasat");
        navigate('/login-page');
    }

    return (
        <div>
            {/* header for dashboard page */}
            <div className="dashboard__header">

                {/* title */}
                <div className="dashboard__title">Kite</div>

                {/* filter button */}
                {/* after the Filter button is clicked and the container with the searching options is displayed, the button will not be displayed anymore */}
                {buttonDisplayed === false ? null : <button className="dashboard__filter-button" onClick={handleFilterButtonClick}> <img src={image1} className="filter__image" /> <span className="filter__span">FILTERS</span> </button>}

                {/* id the user profile circle is clicked, a button with the 'log out' option will appear */}
                <button className="dashboard__userCircleButton"
                    onClick={handleClickUserButton}>
                    <FaUserCircle size={45} className="dashboard__userCircle"/> 
                </button>
                {logOut === true ? <button className="dashboard__logOutButton" onClick={handleLogOutButton}>LOG OUT</button> : null}
            </div>

            <div className="dashboard__mapAndFilter">

                {/* there was choosen the center of Bucharest, Romania, as starting point */}
                <MapContainer center={[44.4317188182863, 26.102904157147936]}
                    zoom={12} scrollWheelZoom={true} style={{ position: 'absolute', top: '0', left: '0' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {/* there were put markers on every point in the map written in the JSON file */}
                    {spots.map((spot) => (
                        <Marker
                            key={spot.id}
                            position={[spot.lat, spot.long]}
                            eventHandlers={{
                                click: (e) => {
                                  console.log('marker clicked', e);
                                },
                              }}
                            icon = {spot.favorite === true ? greenIcon : blueIcon}  // if the spot is favorite, then the marker should be yellow
                        >
                            <DetailsPage spotNeeded={spot} 
                                yellowIcon={greenIcon} 
                                addToFavorites = {addToFavorites}
                                vector={spots}/>
                        </Marker>
                    ))}
                </MapContainer>

                <div className="dashboard__filter">

                    {/* when the Filter button is clicked, the container with the searching options will appear */}
                    {buttonClicked === true ? <Filter vector={spots} /> : null}

                </div>

            </div>

            {/* div for the 'Kite' title*/}
            <div className="dashboard__locations-title">Locations</div>

            {/* searching input */}
            <div className="dashboard__searching-input ">
                <TextField
                    style={{ padding: '5px' }}
                    onChange={inputHandler}
                    label="Searching ..."
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <BiSearch />
                            </InputAdornment>
                        ),
                    }}
                    variant="filled"
                />
            </div>

            <SortTable vector={spots} input={inputText}/>
        </div>
    );
}