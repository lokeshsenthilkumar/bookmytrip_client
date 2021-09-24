import React from 'react'
import axios from 'axios';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import styles from './styles.js';
import jwt_decode from 'jwt-decode';

import BookingCard from './BookingCard'

export default function MyBookings() {

    const jwt = localStorage.getItem('jwt');

    let decoded = jwt_decode(jwt);

    const email = decoded.user.email;

    const url = 'https://bookmytrippp.herokuapp.com/mybookings/'+email;  
    const [res,setRes] = useState(null);

    useEffect( () => {
        axios.get(url,{withCredentials: true})
        .then((response) =>{
            console.log(response);
            setRes(response);
        })
    },[]);

    let checkedTickets = [];

    const handleCheck = (id)=>{
        const index = checkedTickets.indexOf(id);
        if (index > -1){
            checkedTickets.splice(index, 1);
        }
        else
            checkedTickets.push(id);
        console.log(checkedTickets);
    }

    const cancelMany = ()=>{
        axios.post('https://bookmytrippp.herokuapp.com/cancelManyBookings/',{checkedTickets})
        .then((response) =>{
            console.log(response);
            window.location.reload(false);
        })

    }

    return (
        <>
        <nav id="userNavbar" className="navbar navbar-light bg-light" style={{paddingLeft:"20px"}}>
        <Link id="furnitureHomeButton" className="navbar-brand" to="/">
        <span style={{ fontSize: 20, color: "grey" }}>
            <i className="fas fa-train"></i>{" "}
            <span className="navbar-brand mb-0 h1" style={{ color: "#B1BD5D" }}>
            book my trip
            </span>
        </span>
        </Link>

        <span>
        
        
        <Link id="furnitureOrderButton" className="navbar-brand" to="/user/mybookings">
            <span style={{ fontSize: 20, color: "grey" }}>
            <i className="fas fa-ticket-alt"></i>
            </span>{" "}
            <p style={{ display: "inline", color: "#B1BD5D" }}>My Bookings</p>
        </Link>

        <span style={{ fontSize: 20, color: "grey" }}>
            <i className="fas fa-sign-out-alt"></i>
        </span>
        <Link className="navbar-brand" to="/logout" style={{ fontSize: 20, color: "#B1BD5D" }}> &nbsp;Logout</Link>
        </span>
        </nav>

        <div className="body">

            <div style={styles.card} >
                {
                res && res.data.map((booking)=>(
                    <BookingCard booking={booking} handleCheck={handleCheck}/>
                ))
                }
            </div>
            <div style={{textAlign:'center',margin:50}}>
                <button className="btn btn-danger" onClick={cancelMany} style={{marginBottom:"100px"}}>Cancel</button>
            </div>

        </div>        
        </>
    )
}
