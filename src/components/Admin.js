import React from 'react';
import Trains from './Trains';
import isAdmin from './isAdmin.js'

export default function Admin() {
    console.log(isAdmin());
    return (
        <div className="body">
            {isAdmin() ? <Trains who="admin"/> : <h1>Unauthorized</h1>}
        </div>
    )
}
