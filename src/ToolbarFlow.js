import React, {useState} from 'react';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import { useStoreState} from 'react-flow-renderer';

export default function ToolbarFlow ({addLink,addShock,clearAll,setSelect0,setSelect1}) {

  const nodes = useStoreState((store) => store.nodes);
  const edges = useStoreState((store) => store.edges);
  console.log(nodes);
  console.log(edges);


  const [bikeData,setBikeData] = useState({}); //needs to be moved up higher in tree at some point

  const onDragStart = (event, nodeType,pointType) => {
    event.dataTransfer.setData('application/nodeType', nodeType);
    event.dataTransfer.setData('application/pointType',pointType)
    event.dataTransfer.effectAllowed = 'move';
  };

  const _onSelect0 = (option) => setSelect0(option.value);
  const _onSelect1 = (option) => setSelect1(option.value);
  
  const _nodesDroplist = () => {
    const list = (nodes.length ? nodes.map( (node) => ({value: node.id, label: node.data.label})) : [])
    return list
  }

  const nodesToBikeData = () => {
    const points =  Object.assign({}, ...nodes.map((node) => 
                                          ({[node.id]:
                                            {name: node.id,
                                             type: 'fix this later',
                                             pos: [node.position.x,node.position.y]}
                                          })
                                        ));
    const links = Object.assign({}, ...edges.map((edge) => 
                                        ({[edge.id]:
                                          {name: edge.id,
                                           a: edge.source,
                                           b: edge.target}
                                        })
                                      ));
    const data = {points:points,links:links};
    setBikeData(data);
  }

  return (
    <aside>
      <div className="description">Points: drag and drop!</div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'input','linkage')} draggable>
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
      <button onClick={addLink}>  
        Add Link!
      </button>      
      <button onClick={addShock}>  
        Add Shock!
      </button>  
      <button onClick={clearAll}>  
        Clear All!
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
      <button onClick = {nodesToBikeData}>
        Convert!
      </button>
      <div>
      <pre>{JSON.stringify(bikeData,null,2)}</pre>
      </div>
    </aside>
  );
};