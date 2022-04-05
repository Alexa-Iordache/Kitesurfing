import React, { useEffect, useState } from "react";
import './dashboard.css';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import { tableCellClasses } from "@mui/material";
import { styled } from "@mui/material";
import { TextField, TablePagination } from "@mui/material";
import { BiSearch } from 'react-icons/bi';
import InputAdornment from '@mui/material/InputAdornment';
import TablePaginationActions from "../TablePagination";
import Filter from "../filter";
import image1 from './images/filter.png';
import L, { map } from 'leaflet';
import DetailsPage from "../modal";


export default function Dashboard() {

    const [spots, setSpots] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [buttonDisplayed, setButtonDisplayed] = useState(true);
    // const [markerClicked, setMarkerClicked] = useState(false);
    const [favSpots, setFavSpots] = useState([]);


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

    // variable that returns true if there are no empty rows and false in case of the opposite
    // const emptyRows =
    //     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - spots.length) : 0;

    // function for changing the page 
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // function to change how many rows are displayed on one page of the table 
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // style added on the table container 
    const StyledTableContainer = styled(TableContainer)(() => ({
        marginTop: '20px',
        display: 'flex',
        flexFlow: 'row',
        justifyContent: 'space-around'
    }));

    // style added on the cell of the table 
    const StyledTableCell = styled(TableCell)(() => ({

        // the cell from the header of the table
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: 'black',
            color: 'white',
            fontSize: '16px',
            border: '1px solid white',
            borderCollapse: 'collapse',
            padding: '10px',
            textAlign: 'center'
        },

        // the cell from the body of the table
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
            border: '1px solid black',
            borderCollapse: 'collapse',
        },
    }));

    // atyle added on the row of the table
    const StyledTableRow = styled(TableRow)(() => ({
        marginTop: '20px'
    }));

    const handleFilterButtonClick = (e) => {
        setButtonClicked(true);
        setButtonDisplayed(false);
    }

    // we change the spots' 'favorite' attribute to 'true' if that spot is on the list with favorites
    for (var i=0; i <spots.length; i++){
        for (var j=0; j <favSpots.length; j++){
            if (spots[i].id == parseInt(favSpots[j].spot))
            {
                spots[i].favorite = true;
            }
        }
    }

    return (
        <div>
            {/* header for dashboard page */}
            <div className="dashboard__header">
                <div className="dashboard__title">Kite</div>
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
                            <DetailsPage spotNeeded={spot}/>
                        </Marker>
                    ))}


                </MapContainer>

                <div className="dashboard__filter">

                    {/* when the Filter button is clicked, the container with the searching options will appear */}
                    {buttonClicked === true ? <Filter vector={spots} /> : null}

                    {/* after the Filter button is clicked and the container with the searching options is displayed, the button will not be displayed anymore*/}
                    {buttonDisplayed === false ? null : <button className="dashboard__filter-button" onClick={handleFilterButtonClick}> <img src={image1} className="filter__image" /> <span className="filter__span">FILTERS</span> </button>}
                </div>

            </div>

            {/* div for the 'Kite' title*/}
            <div className="dashboard__locations-title">Locations</div>

            {/* searching input */}
            <div className="dashboard__searching-input ">
                <TextField
                    style={{ padding: '5px' }}
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

            <StyledTableContainer>
                <Table stickyHeader style={{ tableLayout: 'fixed', maxWidth: '95%' }}>
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Country</StyledTableCell>
                            <StyledTableCell>Latitude</StyledTableCell>
                            <StyledTableCell>Longitude</StyledTableCell>
                            <StyledTableCell>Wind Prob.</StyledTableCell>
                            <StyledTableCell>When to go</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>

                    <TableBody>
                        {/* split the table rows in table of there is enough space fo them */}
                        {(rowsPerPage > 0 ?
                            spots.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : spots
                        ).map((spot) => (
                            <StyledTableRow>
                                <StyledTableCell>{spot.name}</StyledTableCell>
                                <StyledTableCell>{spot.country}</StyledTableCell>
                                <StyledTableCell>{spot.lat}</StyledTableCell>
                                <StyledTableCell>{spot.long}</StyledTableCell>
                                <StyledTableCell>{spot.probability}</StyledTableCell>
                                <StyledTableCell>{spot.month}</StyledTableCell>
                            </StyledTableRow>
                        ))}

                        {/* {emptyRows > 0 && (
                            <StyledTableRow>
                                <StyledTableCell colSpan={6} />
                            </StyledTableRow>
                        )} */}
                    </TableBody>

                    {/* add footer for the table */}
                    <TableFooter style={{ display: 'flex', alignItems: 'center' }}>
                        <StyledTableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}   // the user can choose how many rows should be dispalyed in the table at a time (5 rows, 10 rows or 25 rows)
                                colSpan={3}
                                count={spots.length} // how many item are (spots)
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </StyledTableRow>
                    </TableFooter>
                </Table>
            </StyledTableContainer>
        </div>
    );
}