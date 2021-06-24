import React, { useMemo,useState , useEffect } from 'react';
import './App.css';

function App() {

  const [solution,setSolution] = useState(0);
  const [save_response,setSave_response] = useState('loading')

  //HARDCODED data - eventually this will come from UI
  const bike_data = {
    "points": {
      "Upper_Pivot": {
        "name": "Upper_Pivot",
        "type": "ground",
        "pos": [
          636.0,
          510.0070176265434
        ]
      },
      "Seatstay": {
        "name": "Seatstay",
        "type": "linkage",
        "pos": [
          557.0,
          518.5708210010368
        ]
      },
      "Rear_Wheel": {
        "name": "Rear_Wheel",
        "type": "rear_wheel",
        "pos": [
          283.0,
          339.40326703742124
        ]
      },
      "Horst_Pivot": {
        "name": "Horst_Pivot",
        "type": "linkage",
        "pos": [
          330.0,
          333.11854180412854
        ]
      },
      "Main_Pivot": {
        "name": "Main_Pivot",
        "type": "ground",
        "pos": [
          610.0,
          357.96658214723374
        ]
      },
      "Shock_Frame": {
        "name": "Shock_Frame",
        "type": "ground",
        "pos": [
          655.0,
          391.0
        ]
      },
      "Front_Wheel": {
        "name": "Front_Wheel",
        "type": "front_wheel",
        "pos": [
          1221.0,
          343.9999999999999
        ]
      },
      "Bottom_Bracket": {
        "name": "Bottom_Bracket",
        "type": "bottom_bracket",
        "pos": [
          616.0,
          322.99999999999994
        ]
      },
      "Shock_Rocker": {
        "name": "Shock_Rocker",
        "type": "linkage",
        "pos": [
          671.0,
          544.0000000000002
        ]
      }
    },
    "links": {
      "Upper_Pivot_Seatstay": {
        "name": "Upper_Pivot_Seatstay",
        "a": "Upper_Pivot",
        "b": "Seatstay"
      },
      "Seatstay_Rear_Wheel": {
        "name": "Seatstay_Rear_Wheel",
        "a": "Seatstay",
        "b": "Rear_Wheel"
      },
      "Horst_Pivot_Rear_Wheel": {
        "name": "Horst_Pivot_Rear_Wheel",
        "a": "Horst_Pivot",
        "b": "Rear_Wheel"
      },
      "Seatstay_Horst_Pivot": {
        "name": "Seatstay_Horst_Pivot",
        "a": "Seatstay",
        "b": "Horst_Pivot"
      },
      "Horst_Pivot_Main_Pivot": {
        "name": "Horst_Pivot_Main_Pivot",
        "a": "Horst_Pivot",
        "b": "Main_Pivot"
      },
      "Shock_Rocker_Seatstay": {
        "name": "Shock_Rocker_Seatstay",
        "a": "Shock_Rocker",
        "b": "Seatstay"
      },
      "Upper_Pivot_Shock_Rocker": {
        "name": "Upper_Pivot_Shock_Rocker",
        "a": "Upper_Pivot",
        "b": "Shock_Rocker"
      },
      "Shock Eye-Eye": {
        "name": "Shock Eye-Eye",
        "a": "Shock_Frame",
        "b": "Shock_Rocker"
      }
    },
    "shock": "Shock Eye-Eye",
    "params": {
      "wheelbase": "1255",
      "chainring_teeth": "30",
      "cassette_teeth": "52",
      "wheel_size": "29",
      "window_width": 1920,
      "window_height": 1017,
      "image_file": "C:\\Users\\Mark\\Documents\\Important\\Programming\\BiKinematics\\ImageFiles\\Example_VitusSommet.jpg",
      "point_colour": [
        0.8875,
        1,
        0.09999999999999998,
        1
      ],
      "link_colour": [
        1,
        0.09999999999999998,
        0.09999999999999998,
        1
      ],
      "shock_colour": [
        0.30000000000000004,
        1.0,
        1,
        1
      ],
      "p2mm": 1.3379530916844349,
      "cog_height": "1100"
    }
  }
  const travel = 100;
  const results = ["Leverage Ratio", "Vertical Travel"];

  useEffect(() => {
    fetch(`/solve?bike_data=${encodeURIComponent(JSON.stringify(bike_data))}&sim_travel=${encodeURIComponent(travel)}&desired_outputs=${encodeURIComponent(JSON.stringify(results))}`)
    .then(res => res.json())
    .then(data => {setSolution(data);
    });
  },[]);

  useEffect(() => {
    fetch(`/savebikedata?bike_data=${encodeURIComponent(JSON.stringify(bike_data))}`)
    .then(res => res.json())
    .then(data => {setSave_response(data);
    });
  },[]);


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
        <p>{save_response}</p>
        <p>
          <SolutionList sol = {solution.LeverageRatio}/>
        </p>
      </header>
    </div>
  );
}

export default App;
