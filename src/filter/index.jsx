import React from "react";
import { TextField } from "@mui/material";
import './filter.css';

// const pokemons = [
//     {
//         id: 1,
//         nome: "Eevee",
//         tipo: "normal",
//         registro: 133,
//         CP: 300
//     },
//     {
//         id: 2,
//         nome: "Charmander",
//         tipo: "fire",
//         registro: 123,
//         CP: 500
//     },
//     {
//         id: 3,
//         nome: "Charizard",
//         tipo: "fire",
//         registro: 123,
//         CP: 500
//     },
//     {
//         id: 4,
//         nome: "Pikachu",
//         tipo: "eletric",
//         registro: 63,
//         CP: 350
//     }
// ];

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

const handleCountry = (e) => {
    console.log(e.target.value);
}

const handleWindProb = (e) => {
    console.log(e.target.value);
}


export default function Filter() {
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

                <button className="filter__button">APPLY FILTER</button>
            </div>

        </div>
    );
}