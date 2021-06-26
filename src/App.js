import React, { useMemo,useState , useEffect } from 'react';
import './App.css';

function App() {

  const [solution,setSolution] = useState(0);
  const [bike_data,setBike_data] = useState('empty')

  const travel = 100;
  const results = ["Leverage Ratio", "Vertical Travel"];

  //NON HARDCODED (now hopefully) data - eventually this will come from UI
  
  //HOOKS

  //get bike data from database -> need to code in id_no
  useEffect(() => {
    loadBikeData();
  },[]);

  function loadBikeData() {
    fetch(`/getbikedata`)
    .then(res => res.json())
    .then(data => {setBike_data(data);
    });
  }

  //solves bike_data whenever it changes
  useEffect(() => {
    fetch(`/solve?bike_data=${encodeURIComponent(JSON.stringify(bike_data))}&sim_travel=${encodeURIComponent(travel)}&desired_outputs=${encodeURIComponent(JSON.stringify(results))}`)
    .then(res => res.json())
    .then(data => {setSolution(data);
    });
  },[bike_data]);



  //React components
  function SolutionList(props) {
    const sol = props.sol;
    if(sol){
    const listItems = sol.map((value) =>
    <li key = {value.toString()}>
      {value}
    </li>
    );
    return (
      <ul>{listItems}</ul>
    );}
    return(<p>Calculating_Results</p>)
  }

  //Rendering
  return (
    <div className="App">
      <header className="App-header">
        <button onClick= {loadBikeData}>ch</button>
        <p>{JSON.stringify(bike_data)}</p>
        <p>
          <SolutionList sol = {solution.LeverageRatio}/>
        </p>
      </header>
    </div>
  );
}

export default App;
