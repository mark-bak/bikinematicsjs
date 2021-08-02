import React, {useState,useEffect} from 'react';

import './App.css'

export default function Top({fetchBikeData,clearBikeData,clearSolutionData}) { 
    return(
        <div class = "top">
        <button onClick = {fetchBikeData}>
            Load Example
        </button>
        <button onClick = {(() => {clearBikeData();clearSolutionData()})}>
            Clear Bike Data
        </button>
        <button //onClick = {}
        >
            Choose Image
        </button>
        </div>
    )
}