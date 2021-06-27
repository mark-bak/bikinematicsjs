import React, {useState} from 'react';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import { useStoreState, useStoreActions, addEdge } from 'react-flow-renderer';

export default function ToolbarFlow () {

  const[select0,setSelect0] = useState(null);
  const[select1,setSelect1] = useState(null);
  const nodes = useStoreState((store) => store.nodes);

  const onDragStart = (event, nodeType,pointType) => {
    event.dataTransfer.setData('application/nodeType', nodeType);
    event.dataTransfer.setData('application/pointType',pointType)
    event.dataTransfer.effectAllowed = 'move';
  };

  //unused atm
  const _onSelect0 = (option) => setSelect0(option.value);
  const _onSelect1 = (option) => setSelect1(option.value);
  const _addLink = () => addEdge({},[select0,select1]);

  const _nodesDroplist = () => {
    const list = (nodes.length ? nodes.map( (node) => ({value: node.id, label: node.data.label})) : [])
    return list
  }

  return (
    <aside>
      <div className="description">Points: drag and drop!</div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'customnode','linkage')} draggable>
        Linkage Point
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'input','ground')} draggable>
        Ground Point
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'input','rear_wheel')} draggable>
        Rear Wheel
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'input','front_wheel')} draggable>
        Front Wheel
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'input','bottom_bracket')} draggable>
        Bottom bracket 
      </div>
      <div className="description">Add links!</div>
      <Dropdown options = {_nodesDroplist()}
                onChange={_onSelect0} 
                value={"Select link"} 
                placeholder="Select link"
      />
      <Dropdown options = {_nodesDroplist()}
                onChange={_onSelect1}  
                value={"Select link"} 
                placeholder="Select link"
      />
      <button onClick={_addLink}>  
        Add Link!
      </button>      

      <div>
      {/* all the random shit goes here*/}
        {nodes.map((node) => (
          <div key = {node.id}>
            {node.data.label} {"\n"}
            x: {node.__rf.position.x.toFixed(2)}, y: {node.__rf.position.y.toFixed(2)} 
          </div>
        ))}
        {select0}{select1}
        
      </div>
    </aside>
  );
};