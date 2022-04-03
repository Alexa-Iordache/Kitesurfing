import React from "react";
import './dashboard.css';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { tableCellClasses } from "@mui/material";
import { styled } from "@mui/material";
import { TextField } from "@mui/material";
// import { iconPerson } from './Icon';
// import { icon } from "leaflet";

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spots: [],
            activeSpot: null,
        }
    }

    // get the information about the spots from JSON and put them in 'spots'
    async componentDidMount() {
        const response = await axios.get('https://5ddbb358041ac10014de140b.mockapi.io/spot');
        this.setState({
            spots: response.data
        });
        console.log(this.state.spots);
    }

    render() {

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
                    {this.state.spots.map((spot) => (
                        <Marker key={spot.id}
                            position={[spot.lat, spot.long]}
                            eventHandlers={{    // event handler for click is added on markers
                                click: () => {
                                    //console.log(spot.lat, spot.long);
                                    this.setState({
                                        activeSpot: spot    // if a marker is clicked, the spot will be active
                                    })
                                    console.log(this.state.activeSpot);
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
                <TextField label="Searching" sx={{textAlign: 'left'}}/>

                <StyledTableContainer>
                    <Table stickyHeader style={{tableLayout: 'auto', maxWidth: '95%'}}>
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
                            {this.state.spots.map((spot) => (
                                <StyledTableRow key={spot.id}>
                                    <StyledTableCell>{spot.name}</StyledTableCell>
                                    <StyledTableCell>{spot.country}</StyledTableCell>
                                    <StyledTableCell>{spot.lat}</StyledTableCell>
                                    <StyledTableCell>{spot.long}</StyledTableCell>
                                    <StyledTableCell>{spot.probability}</StyledTableCell>
                                    <StyledTableCell>{spot.month}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </StyledTableContainer>

            </div>
        );
    }
}