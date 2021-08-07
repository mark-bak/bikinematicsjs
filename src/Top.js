import React from 'react';

import './App.css'

export default function Top({fetchBikeData,clearBikeData,clearSolutionData}) { 
    return(
        <div class = "top">
        <button className = "top-button" onClick = {fetchBikeData}>
            Load Example
        </button>
        <button  className = "top-button"//onClick = {}
        >
            Choose Image
        </button>
        </div>
    )
}