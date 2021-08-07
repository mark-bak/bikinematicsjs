import React, { useState , useEffect } from 'react';
import './App.css';
import SyncLineChart from './SyncLineChart';
import BikeFlowChart from './BikeFlowChart';
import Top from './Top';


function App() {

  const [bikeData,setBikeData] = useState(null);
  const [solution,setSolution] = useState({});

  const clearBikeData = () => {setBikeData(null)} 
  const clearSolutionData = () => {setSolution({})}

  const travel = 170; //unhardcode as well pls
  const results = ["LeverageRatio", 'AntiSquatPercent',"VerticalTravel"];

  //useEffect(() => {
  //  fetchBikeData();
  //},[]);

  useEffect(() => {
    solveBikeData();
  },[bikeData]);

  const fetchBikeData =  () => {
    fetch(`/api/getbikedata`)
    .then(res => res.json())
    .then(data => {setBikeData(data);
    });
  }

  //solves bike_data whenever it changes
  const solveBikeData = () => {
    fetch(`/api/solve?bike_data=${encodeURIComponent(JSON.stringify(bikeData))}&sim_travel=${encodeURIComponent(travel)}&desired_outputs=${encodeURIComponent(JSON.stringify(results))}`)
    .then(res => res.json())
    .then(data => setSolution(data));
  };

  //Rendering
  return (
    <div className="App">
      <div class = "grid-container">
        <Top
          fetchBikeData = {fetchBikeData}
        />
        <div class = "left">
          <BikeFlowChart
            bikeData = {bikeData}
            setBikeData = {setBikeData}
            clearBikeData = {clearBikeData}
            clearSolutionData = {clearSolutionData}
          />
        </div>
        <div class = "right">
          <SyncLineChart 
            data={(solution)}
            leverage_ratio_key = {results[0]} 
            anti_squat_key = {results[1]} 
            travel_key = {results[2]} 
          />
        </div>
      </div>
    </div>
  );
}

export default App;
