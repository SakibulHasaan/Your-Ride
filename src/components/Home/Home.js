import React from 'react';
import './Home.css'
import car from '../../images/car.png'
import bike from '../../images/bike.png'
import bus from '../../images/bus.png'
import train from '../../images/train.png'
import Login from '../Login/Login';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

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

const Home = () => {

    const handleDivClick = (name) => {
        console.log(name);
    }
    return (
        <div className="container rides-container justify-content-center">
            <div className="row  w-100">
                {
                    rides.map((ride) =>
                        <div onclick={() => handleDivClick(ride.name)} className="col-md-3 p-3 col-sm-12 shadow mt-5">
                             <Link style={{ textDecoration: 'none' }} to={`/destination/${ride.name}`}>
                             <div className="card text-center single-ride">

                                <div>
                                    <img src={ride.image} className="img-fluid" alt="" />
                                    <div className="card-title">
                                        <h1>{ride.name}</h1>
                                    </div>
                                </div>
                                
                            </div>
                             
                             </Link>
                        </div>)
                }
            </div>
        </div>
    );
};

export default Home;