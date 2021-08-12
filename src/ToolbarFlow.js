import React from 'react';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './App.css'

import { useStoreState} from 'react-flow-renderer';

export default function ToolbarFlow ({addLink,
                                      addShock,
                                      setSelect0,
                                      setSelect1,
                                      clearAll,
                                      params,
                                      setParams,
                                      changeFlag,
                                      setChangeFlag}) {

  const nodes = useStoreState((store) => store.nodes);
  const edges = useStoreState((store) => store.edges);

  //const [convBikeData,setConvBikeData] = useState({}); //needs to be moved up higher in tree at some point

                                   

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/nodeType', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const _onSelect0 = (option) => setSelect0(option.value);
  const _onSelect1 = (option) => setSelect1(option.value);
  
  const _nodesDroplist = () => {
    const list = (nodes.length ? nodes.map( (node) => ({value: node.id, label: node.data.label})) : [])
    return list
  }

  const updateWheelSize = (event) => {
    const newParams = params
    newParams['wheel_size'] = parseFloat(event.target.value)
    setParams(newParams)
    setChangeFlag(!changeFlag)
  }

  return (
    <aside>
      <div className="title">Add Points:</div>
      <div className = "description">Drag to add</div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'linkage')} draggable>
        Linkage Point
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'ground')} draggable>
        Ground Point
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'rear_wheel')} draggable>
        Rear Wheel
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'front_wheel')} draggable>
        Front Wheel
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'bottom_bracket')} draggable>
        Bottom bracket 
      </div>
      <div className="title">Add links:</div>
      <Dropdown 
        className = "dropdown"
        placeholderClassName = "dropdown"
        controlClassName = "dropdown"
        menuClassName = "dropdown-menu"
        arrowClassName = "arrow"
        options = {_nodesDroplist()}
        onChange={_onSelect0} 
        value={"Select link"} 
        placeholder="Select link"
      />
      <Dropdown 
        className = "dropdown"
        placeholderClassName = "dropdown"
        controlClassName = "dropdown"
        menuClassName = "dropdown-menu"
        arrowClassName = "arrow"
        options = {_nodesDroplist()}
        onChange={_onSelect1}  
        value={"Select link"} 
        placeholder="Select link"
      />   
      <button className = "button" onClick={addLink}>  
        Add Link!
      </button>   
      <button className = "button" onClick={addShock}>  
        Add Shock!
      </button>  
      <div className="title">Clear Data:</div>
      <button className = "button" onClick={clearAll}>  
        Clear
      </button>  
      <div>
      {/* all the random shit goes here*/}
        {nodes.map((node) => (
          <div key = {node.id}>
            {node.id} {"\n"}
            x: {node.__rf.position.x.toFixed(2)}, y: {node.__rf.position.y.toFixed(2)} 
          </div>
        ))}     
      </div>
      <div>
        {edges.map((edge) => (
          <div key = {edge.id}>
            {edge.id}
          </div>
        ))}   
      </div>
      <div>
      <input
        onChange = {updateWheelSize} 
        placeholder ="Wheel Size (in)"/>  
      </div>
    </aside>
  );
};