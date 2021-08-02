import React, { useState, useRef } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  removeElements,
  Controls,
  Background,
  addEdge,
  useStoreState 
  } from 'react-flow-renderer';

import ToolbarFlow from './ToolbarFlow'
import { CustomNode } from './CustomNodes';

import './dnd.css';

  
  //id system to be used by nodes in 'flowchart' used to represent bike geo
  let id = 0;
  const getId = () => `Point_${id++}`;  

  //start with no geo
  const initialElements = [];

  const img_link = 'https://ep1.pinkbike.org/p5pb20979226/p5pb20979226.jpg'; //UNHARDCODE later

  export default function BikeFlowChart({nodesToBikeData,bikeData,setBikeData}){


    const[select0,setSelect0] = useState(null);
    const[select1,setSelect1] = useState(null);

    const reactFlowWrapper = useRef(null);

    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [elements, setElements] = useState(initialElements);
    const [shock,setShock] = useState("");

    //flowchart element adding and removing fcns
    const addLink = () => {
      if (select0===select1) {} //do nothing if equal
      else{
        const params =  {id: `${select0}-${select1}`,source: select0,target: select1,type: 'straight'}
        setElements((els) => addEdge(params, els))}
    }

    const addShock = () => {
      if (select0===select1) {} //do nothing if equal
      else {
        const params =  {id: `${select0}-${select1}`,source: select0,target: select1,type: 'straight',style: { stroke: 'red' }}
        setElements((els) => addEdge(params, els))
        setShock(params["id"])}
    }

    const clearAll = () => {
      setElements([])
    }
    
    const onElementsRemove = (elementsToRemove) =>
      setElements((els) => removeElements(elementsToRemove, els));
  
    const onLoad = (_reactFlowInstance) =>
      setReactFlowInstance(_reactFlowInstance);
  
    const onDragOver = (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    };

    //create chart element when dropped over from sidebar
    const onDrop = (event) => {
      event.preventDefault();
      
      if (reactFlowInstance){

        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const type = event.dataTransfer.getData('application/nodeType');
        const width = 100

        const position = reactFlowInstance.project({
          x: event.clientX-width*(2/3) , //should do this properly but 2/3 kinda works
          y: event.clientY ,
        });
        const point_id = getId();
        const newNode = {
          id: point_id, type, position, connectable:true,
          style: {
            width: width
          },
          data: {
            label: (  <> {point_id} {"\n"} {type} </>)
          },
        };
        setElements((es) => es.concat(newNode));
      }
    };
    
    const loadBikeData = (data) => {
      clearAll()
      if (data === null) {return};
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
      const newNodes = [];
      const points = data["points"];
      const links = data["links"];
      for (let p in points){
        newNodes.push({id: points[p]["name"], 
                      type: points[p]["type"],
                      position: {x:points[p]["pos"][0],y:reactFlowBounds.height - points[p]["pos"][1]},
                      style: {
                        width: 100
                      },
                      data: {
                        label: (  <> {points[p]["name"]} {"\n"} {points[p]["type"]} </>)
                      },
        })
      }
      setElements((es) => es.concat(newNodes));

      for (let l in links) {
        const params = {id: links[l]["name"],source: links[l]["a"],target: links[l]["b"],type: 'straight'}
        setElements((es) => addEdge(params,es))
      }
      setShock(data["shock"])
    };

    const nodeTypes = {
      linkage: CustomNode,
      ground: CustomNode,
      rear_wheel: CustomNode,
      front_wheel: CustomNode,
      bottom_bracket: CustomNode
    }

    const help = () =>{
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
      console.log(reactFlowBounds)
    }

    return(
      <div className="dndflow">
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref = {reactFlowWrapper}>
            <ReactFlow
              elements={elements}
              //onConnect={onConnect}
              onElementsRemove={onElementsRemove}
              onLoad={onLoad}
              onDrop={onDrop}
              onDragOver={onDragOver}
              nodeTypes={nodeTypes}
            >
            <Controls />
            <Background style={ { backgroundImage: "",//`url(${img_link})`,
                                  backgroundRepeat: 'no-repeat',
                                  backgroundSize: `100% auto`}}/>
            </ReactFlow>
          </div>
          <ToolbarFlow addLink = {addLink}
                    addShock = {addShock} 
                    shock = {shock}
                    clearAll = {clearAll} 
                    setSelect0 = {setSelect0} 
                    setSelect1 = {setSelect1}
                    nodesToBikeData = {nodesToBikeData}
                    loadBikeData = {loadBikeData}
                    bikeData = {bikeData}
                    setBikeData = {setBikeData}
                    reactFlowWrapper = {reactFlowWrapper}/>
        </ReactFlowProvider>
    </div>
    );
  }