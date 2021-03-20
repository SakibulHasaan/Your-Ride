import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import map from '../../images/Map.png';
import './FindRoute.css';
import car from '../../images/car.png';
import bike from '../../images/bike.png';
import bus from '../../images/bus.png';
import train from '../../images/train.png';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import GoogleMap from '../GoogleMap/GoogleMap';

export const rides = [
    {
        name: 'bike',
        people: 1,
        price: 25,
        image: bike
    },
    {
        name: 'car',
        people: 1,
        price: 30,
        image: car
    },
    {
        name: 'bus',
        people: 1,
        price: 15,
        image: bus
    },
    {
        name: 'train',
        people: 1,
        price: 10,
        image: train
    }
]

const FindRoute = () => {

    let { vehicle } = useParams();
    const [searchClicked, setSearchClicked] = useState(false);
    const [rideInfo, setRideInfo] = useState({});

    let from;
    let to;

    const handleBlur = (e) => {
        if (e.target.name === "from") { from = e.target.value }
        if (e.target.name === "to") { to = e.target.value }
    }

    const showRoute = (e) => {
        setSearchClicked(true);
        e.preventDefault();
        const selectedRide = rides.filter(ride => ride.name === vehicle.toLowerCase());
        console.log(selectedRide[0]);
        setRideInfo(selectedRide[0]);
    }

    return (
        <div className="p-5">
            <div className="row w-100 h-100">


                {
                    !searchClicked ?
                        <div className="w-30 col-md-6 col-sm-12">
                            <h1>Your Selected Ride is {vehicle}</h1>
                            <form onSubmit={showRoute}>
                                <input className="form-control" name="from" type="text" onBlur={handleBlur} placeholder="From" required />
                                <input className="form-control" name="to" type="text" onBlur={handleBlur} placeholder="To" required />
                                <input className='btn btn-info' type="submit" value="Search" />
                            </form>
                        </div>

                        :

                        <div className="v-container w-30 col-md-6 col-sm-12">
                            
                            <h1>{from}</h1>
                            <h1>{to}</h1>

                            <div className="single-v bg-light">
                                <img src={rideInfo.image} alt="" />
                                <h3>&nbsp; {rideInfo.name}</h3>
                                <h3>&nbsp; P: 1 </h3>
                                <h3> &nbsp; ${rideInfo.price * 1}</h3>
                            </div>

                            <div className="single-v bg-light">
                                <img src={rideInfo.image} alt="" />
                                <h3>&nbsp; {rideInfo.name}</h3>
                                <h3>&nbsp; P: 2</h3>
                                <h3>&nbsp; ${rideInfo.price * 2}</h3>
                            </div>

                            <div className="single-v bg-light">
                                <img src={rideInfo.image} alt="" />
                                <h3>&nbsp; {rideInfo.name}</h3>
                                <h3>&nbsp; P: 4</h3>
                                <h3>&nbsp; ${rideInfo.price * 4}</h3>
                            </div>
                        </div>
                }

                <div className="w-50 col-md-6 col-sm-12 map">
                    <GoogleMap></GoogleMap>
                </div>

            </div>

        </div>
    );
};

export default FindRoute;
