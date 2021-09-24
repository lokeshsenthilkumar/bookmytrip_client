import React, {useState} from 'react';
import styles from './styles.js';

import BookTrain from './BookTrain';

export default function UTrainCard(props) {

    var trainNo = props.trains.trainNo;
    var trainName = props.trains.trainName;
    var price = props.trains.price;

    const handleClick=()=>{
        history.push('/user/book/'+trainNo);
    }

    
    return (
        <div>
            <div className="card" style={styles.eachcard}>
                <img className="card-img-top" src="..." alt=""/>
                <div className="card-body">
                    <h5 className="card-title">Train Number : {trainNo}</h5>
                    <h5 className="card-title">Train Name : {trainName}</h5>
                    <p className="card-text" style={{fontSize:"1.3rem"}}>Ticket Price : {price}$</p>
                    <button className="btn btn-primary" onClick={handleClick}>Book</button>
                </div>
            </div>
        </div>
    )
}
