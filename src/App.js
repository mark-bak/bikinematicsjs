import React, { useMemo,useState , useEffect } from 'react';
import './App.css';
import SyncLineChart from './SyncLineChart';
import BikeFlowChart from './BikeFlowChart';


function App() {

  const [bikeData,setBikeData] = useState(null);
  const [solution,setSolution] = useState({});

  const clearBikeData = () => {setBikeData(null)} 
  const clearSolutionData = () => {setSolution({})}

  const travel = 170;
  const results = ["LeverageRatio", 'AntiSquatPercent',"VerticalTravel"];

  useEffect(() => {
    fetchBikeData();
  },[]);

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
    .then(data => {setSolution(data);
    });
  };
 

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

  const nodesToBikeData = (nodes,edges) => { 
    const points =  
      Object.assign({},
        ...nodes.map((node) => (
          {[node.id]: {name: node.id,
                        type: node.type,
                        pos: [node.position.x,node.position.y]}}
        ))
      );
    const links = 
      Object.assign({},
        ...edges.map((edge) => (
          {[edge.id]:{name: edge.id,
                       a: edge.source,
                       b: edge.target}}
        ))
      );
    const data = {points:points,links:links};
    return(data);
  }


  //Rendering
  return (
    <div className="App">
      <div class = "grid-container">
        <div class = "left">
          <BikeFlowChart
            nodesToBikeData ={nodesToBikeData}
            bikeData = {bikeData}
            setBikeData = {setBikeData}
          />
        </div>
        <div class = "mid">
          <button onClick = {fetchBikeData}>
            fetchBikeData
          </button>
          <button onClick = {(() => {clearBikeData();clearSolutionData()})}>
            clearBikeData
          </button>
          <pre style={{fontSize: "8px"}}>{JSON.stringify(bikeData,null,2)}</pre>
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
