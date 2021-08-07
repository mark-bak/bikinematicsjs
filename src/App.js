import React, { useMemo,useState , useEffect } from 'react';
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

  const nodesToBikeData = (nodes,edges,shock,y_offset) => { 
    const points =  
      Object.assign({},
        ...nodes.map((node) => (
          {[node.id]: {name: node.id,
                        type: node.type,
                        pos: [node.__rf.position.x, y_offset - node.__rf.position.y]}}
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
    
      const params = {
        wheelbase: 1255,
        chainring_teeth: 30,
        cassette_teeth: 52,
        wheel_size: 29,
        p2mm: 1.3379530916844349,
        cog_height: 1100
        }; //unhardcode these i beg you at some point

    const data = {points:points,links:links,shock:shock,params:params};
    return(data);
  }


  //Rendering
  return (
    <div className="App">
      <div class = "grid-container">
        <Top
          fetchBikeData = {fetchBikeData}
        />
        <div class = "left">
          <BikeFlowChart
            nodesToBikeData ={nodesToBikeData}
            bikeData = {bikeData}
            setBikeData = {setBikeData}
            clearBikeData = {clearBikeData}
            clearSolutionData = {clearSolutionData}
          />
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
