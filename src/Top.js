import React from 'react';

import './App.css'

export default function Top({fetchBikeData,clearBikeData,clearSolutionData,setDebug,debug}) { 

    return(
        <div class = "top">
        <button className = "top-button" onClick = {() => {fetchBikeData(1)}}>
            Load Example 1
        </button>
        <button className = "top-button" onClick = {() => {fetchBikeData(2)}}>
            Load Example 2
        </button>
        <button className = "top-button" onClick = {() => {fetchBikeData(3)}}>
            Load Example 3
        </button>
        <button className = "top-button" onClick = {() => {fetchBikeData(4)}}>
            Load Example 4
        </button>


        <button  className = "top-button"//onClick = {}
        >
            Choose Image
        </button>
        <button  className = "top-button" onClick = {() => setDebug(!debug)}
        >
        DEBUG {debug? <>on</>: <>off</>}
        </button>
        </div>
        
    )
}

