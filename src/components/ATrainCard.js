import React from 'react';
import styles from './styles.js';
import axios from "axios";
import { Button , Table} from 'react-bootstrap';


export default function ATrainCard(props) {

    var trainNo = props.trains.trainNo;
    var trainName = props.trains.trainName;
    var price = props.trains.price;
    var id = props.trains._id;

    // alert(id);

    const handleClick = (event)=>{
        event.preventDefault();
        
        axios.post('https://bookmytrippp.herokuapp.com/cancelTrain',{id})
        .then(function(response){
            console.log("Responded");
            //window.location.reload(false);
            console.log(response);
        })
        .catch(function(err){
            console.log("No response");
            console.log(err);
        });
        
        window.location.reload(false);
        //alert('Booking Cancelled');
    }

    return (
        <div>
            <div className="card" style={styles.eachcard}>
                <img className="card-img-top" src="..." alt=""/>
                <div className="card-body">
                    <h5 className="card-title">Train No: {trainNo}</h5>
                    <h5 className="card-title">Train Name: {trainName}</h5>
                    <p className="card-text" style={{fontSize:"1.3rem"}}>Ticket Price : {price}$</p>
                    <button className="btn btn-danger" onClick={handleClick} >Remove</button>
                </div>
            </div>
            
        </div>
    )
}
