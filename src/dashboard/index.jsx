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


export default function Dashboard() {

    const [spots, setSpots] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // get the information about the spots from JSON and put them in 'spots'
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get('https://5ddbb358041ac10014de140b.mockapi.io/spot');
            setSpots(request.data);
            console.log(request.data);
            return request;
        }
        fetchData();
    }, []);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - spots.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

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

    return (
        <div>
            {/* header for dashboard page */}
            <div className="dashboard__header">Kite</div>

            {/* there was choosen the center of Bucharest, Romania, as starting point */}
            <MapContainer className="map-container" center={[44.4317188182863, 26.102904157147936]} zoom={12} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* there were put markers on every point in the map written in the JSON file */}
                {spots.map((spot) => (
                    <Marker key={spot.id}
                        position={[spot.lat, spot.long]}
                        eventHandlers={{    // event handler for click is added on markers
                            click: () => {
                                //console.log(spot.lat, spot.long);
                                // this.setState({
                                //     activeSpot: spot    // if a marker is clicked, the spot will be active
                                // })
                                // console.log(activeSpot);
                            }
                        }}

                    />
                ))}

                {/* if the spot is active (it was clicked on), then a popup will appear */}
                {/* {this.state.activeSpot && (
                     <Popup position={[this.state.activeSpot.lat, this.state.activeSpot.long]}>
                         <div>popup</div>
                     </Popup>
                 )} */}

            </MapContainer>

            <div className="dashboard__locations-title">Locations</div>

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
                <Table stickyHeader style={{ tableLayout: 'auto', maxWidth: '95%' }}>
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

                        {emptyRows > 0 && (
                            <StyledTableRow>
                                <StyledTableCell colSpan={6} />
                            </StyledTableRow>
                        )}
                    </TableBody>

                    <TableFooter>
                        <StyledTableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={3}
                                count={spots.length}
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