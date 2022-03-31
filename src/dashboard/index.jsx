import React from "react";
import './dashboard.css';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import axios from "axios";
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
            </div>
        );
    }
}