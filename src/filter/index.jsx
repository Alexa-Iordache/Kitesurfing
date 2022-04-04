import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import './filter.css';
import axios from "axios";

// const buttons = [
//     {
//         name: "All",
//         value: "all"
//     },
//     {
//         name: "Fire",
//         value: "fire"
//     },
//     {
//         name: "Normal",
//         value: "normal"
//     },
//     {
//         name: "Electric",
//         value: "eletric"
//     }
// ];

// function getPokemon() {
//     const pokemonList = pokemons;
//     console.log(pokemonList);
//     return pokemonList;
// }

// function filterPokemon(pokeType) {
//     let filtredPokemon = getPokemon().filter(type => type.tipo === pokeType);
//     return filtredPokemon;
// }



// export default function Filter() {
//     const [filtredPokemon, setFiltredPokemon] = useState(null);

//     useEffect(() => {
//         setFiltredPokemon(getPokemon());
//     }, []);

//     function handlePokemon(e) {
//         let typePokemon = e.target.value;
//         typePokemon !== "all"
//             ? setFiltredPokemon(filterPokemon(typePokemon))
//             : setFiltredPokemon(getPokemon());
//     }

//     return (
//         <>
//             {buttons &&
//                 buttons.map((type, index) => (
//                     <>
//                         <button key={index} value={type.value} onClick={handlePokemon}>
//                             {type.name}
//                         </button>
//                     </>
//                 ))}

//             {filtredPokemon &&
//                 filtredPokemon.map(type => (
//                     <ul key={type.id}>
//                         <li>{type.nome}</li>
//                     </ul>
//                 ))}
//         </>
//     );
// }

export default function Filter() {

    const [spots, setSpots] = useState([]);
    // const [filtredSpots, setFiltredSpots] = useState(null);
    const [country, setCountry] = useState('');
    const [windProb, setWindProb] = useState(0);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get('https://5ddbb358041ac10014de140b.mockapi.io/spot');
            setSpots(request.data);
            return request;
        }
        fetchData();
    }, []);

    const handleCountry = (e) => {
        setCountry(e.target.value);
        console.log(country);
    }
    
    const handleWindProb = (e) => {
        setWindProb(e.target.value);
        console.log(parseInt(e.target.value, 10));
    }
    

    // const getSpot = () => {
    //     const spotsList = spots;
    //     console.log(spotsList);
    //     return spotsList;
    // }

    // const filterSpots = (spotType) => {
    //     let filtredSpots = getSpot().filter(type => type.tipo === spotType);
    //     return filtredSpots;
    // }

    // useEffect(() => {
    //     setFiltredSpots(getSpot());
    // }, []);

    function handleSpot(e) {
        // let typeSpot = e.target.value;
        // typeSpot !== "all"
        //     ? setFiltredSpots(filtredSpots(typeSpot))
        //     : setFiltredSpots(getSpot());
        spots.map((spot) => (
            (spot.country === country && spot.probability == windProb)
                ? console.log(spot) 
                // : console.log("nu exista")
                : console.log("nu exista")
        ))
    }


    return (
        <div className="filter__main-container">
            <div className="filter__second-container">
                <TextField
                    label="Country"
                    variant="filled"
                    //value={country}
                    onChange={handleCountry}
                />
                <TextField
                    label="Wind Probability"
                    variant="filled"
                    //value={country}
                    onChange={handleWindProb}
                />

                <button className="filter__button" onClick={handleSpot}>APPLY FILTER</button>
            </div>

        </div>
    );
}