import React, {useState,useEffect} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'

import styles from './styles.js';

export default function AddTrain(props) {

    const [details,setDetails] = useState({
        trainNo:"",
        trainName:"",
        from:"",
        to:"",
        price:0,
    });

    const handleChange = (event)=>{
        const {name,value} = event.target;
        setDetails(prevValue => ({
            ...prevValue,
            [name]:value
        }));
    }

    const handleClick = (event)=>{
        event.preventDefault();

        const pDetails = {
            trainNo:event.target[0].value,
            trainName:event.target[1].value,
            from:event.target[2].value,
            to:event.target[3].value,
            price:event.target[4].value
        }

        axios.post('https://bookmytrippp.herokuapp.com/addTrain',pDetails)
        .then(function(response){
            console.log("Responded");
        })
        .catch(function(err){
            console.log("No response");
        });

    }

    return (
        <div>
            <nav id="userNavbar" className="navbar navbar-light bg-light" style={{marginLeft:"20px"}}>
                <Link id="furnitureHomeButton" className="navbar-brand" to="/">
                <span style={{ fontSize: 20, color: "grey" }}>
                    <i className="fas fa-train"></i>{" "}
                    <span className="navbar-brand mb-0 h1" style={{ color: "#B1BD5D" }}>
                    book my trip
                    </span>
                </span>
                </Link>

                <span>
                <Link id="furnitureOrderButton" className="navbar-brand" to="/admin">
                <span style={{ fontSize: 20, color: "grey" }}>
                    <i className="fas fa-subway"></i>
                </span>{" "}
                <p style={{ display: "inline", color: "#B1BD5D" }}>Trains</p>
                </Link>
                
                <span style={{ fontSize: 20, color: "grey" }}>
                    <i className="fas fa-sign-out-alt"></i>
                </span>
                <Link className="navbar-brand" to="/logout" style={{ fontSize: 20, color: "#B1BD5D" }}> &nbsp;Logout</Link>
                </span>
            </nav>
            <div className='container' style={styles.formdiv}>
            <div className='form-div card crd'  style={styles.eachcard} >
                <form onSubmit={ handleClick}>
                <input 
                    type='text'
                    name="productNo" 
                    placeholder='Train No'
                    onChange={handleChange}
                    value={details.TrainNo}
                    className='form-control form-group'
                    /> <br />
                    <input 
                    type='text'
                    name="productName" 
                    placeholder='Train Name'
                    onChange={handleChange}
                    value={details.TrainName}
                    className='form-control form-group'
                    /> <br />
                    <input 
                    type='text'
                    name="from" 
                    placeholder='From'
                    onChange={handleChange}
                    value={details.from}
                    className='form-control form-group'
                    /> <br />
                    <input 
                    type='text'
                    name="to" 
                    placeholder='To'
                    onChange={handleChange}
                    value={details.to}
                    className='form-control form-group'
                    /> <br />
                    <input 
                    type='number' 
                    name="price"
                    placeholder='Ticket Price'
                    onChange={handleChange}
                    value={details.price}
                    className='form-control form-group'
                    /> <br />
                    
                    <button type='submit' className='btn btn-primary btn-block'>{"Add"}</button>
                </form>
            </div>
        </div>
        </div>
    )
}
