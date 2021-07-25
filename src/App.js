import React, { useMemo,useState , useEffect } from 'react';
import './App.css';
import SyncLineChart from './SyncLineChart';
import BikeFlowChart from './BikeFlowChart';


function App() {

  const [bike_data,setBike_data] = useState(null);
  const [solution,setSolution] = useState({});

  const travel = 170;
  const results = ["LeverageRatio", 'AntiSquatPercent',"VerticalTravel"];

  useEffect(() => {
    loadBikeData();
  },[]);

  const loadBikeData =  () => {
    fetch(`/api/getbikedata`)
    .then(res => res.json())
    .then(data => {setBike_data(data);
    });
  }

  //solves bike_data whenever it changes
  useEffect(() => {
    fetch(`/api/solve
                    ?bike_data=${encodeURIComponent(JSON.stringify(bike_data))}
                    &sim_travel=${encodeURIComponent(travel)}
                    &desired_outputs=${encodeURIComponent(JSON.stringify(results))}`)
    .then(res => res.json())
    .then(data => {setSolution(data);
    });
  },[bike_data]);
 
  const isEmpty = (obj) => (
    Object.keys(obj).length === 0
  );

  const dataToChartFormat = (data) => (
    (isEmpty(data) ? [] : _format(data))
  );

  const _format = (data) => {
    let r = [];
    for (let i = 0; i < Object.values(data)[0].length; i++){
      let dpoint = {}
      for (let sol_name in data){        
        dpoint[sol_name] = data[sol_name][i]
      }
      r.push(dpoint)
    }
    return r;
  };

  //Rendering
  return (
    <div className="App">
      <div class = "grid-container">
        <div class = "left">
          <BikeFlowChart/>
        </div>
        <div class = "mid">
          <pre>{JSON.stringify(bike_data,null,2)}</pre>
        </div>
        <div class = "right">
          <SyncLineChart 
            data={dataToChartFormat(solution)}
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
