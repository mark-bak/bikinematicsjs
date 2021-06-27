import React, { useMemo,useState , useEffect } from 'react';
import './App.css';
import SyncLineChart from './SyncLineChart';

function App() {

  const [bike_data,setBike_data] = useState(null)
  const [solution,setSolution] = useState({});


  const travel = 170;
  const results = ["Leverage Ratio", 'Anti Squat Percent',"Vertical Travel"];

  //NON HARDCODED (now hopefully) data - eventually this will come from UI
  
  //HOOKS
  //get bike data from database -> need to code in id_no
  useEffect(() => {
    loadBikeData();
  },[]);

  function loadBikeData() {
    fetch(`/api/getbikedata`)
    .then(res => res.json())
    .then(data => {setBike_data(data);
    });
  }

  //solves bike_data whenever it changes
  useEffect(() => {
    fetch(`/api/solve?bike_data=${encodeURIComponent(JSON.stringify(bike_data))}&sim_travel=${encodeURIComponent(travel)}&desired_outputs=${encodeURIComponent(JSON.stringify(results))}`)
    .then(res => res.json())
    .then(data => {setSolution(data);
    });
  },[bike_data]);
 
  function isEmpty(obj){
    return Object.keys(obj).length === 0;
  }

  function dataToChartFormat(data) {
    const ret = (isEmpty(data) ? [] : _format(data));
    return ret;
  }

  function _format(data){
    let r = [];
    for (let i = 0; i < Object.values(data)[0].length; i++){
      let dpoint = {}
      for (let sol_name in data){        
        dpoint[sol_name] = data[sol_name][i]
      }
      r.push(dpoint)
    }
    return r;
  }

  //Rendering
  return (
    <div className="App">
      <div class = "grid-container">
        <div class = "left"><pre>{JSON.stringify(bike_data,null,2)}</pre></div>
        <div class = "mid">
          <pre>{JSON.stringify(dataToChartFormat(solution),null,2)}</pre>
        </div>
        <div class = "right">
          <SyncLineChart 
            data={dataToChartFormat(solution)}
            leverage_ratio_key = "LeverageRatio" 
            anti_squat_key = "AntiSquatPercent"
            travel_key = "VerticalTravel"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
