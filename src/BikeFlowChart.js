import React, { useState, useRef } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  Background,
  } from 'react-flow-renderer';

import ToolbarFlow from './ToolbarFlow'

import './dnd.css';

let id = 0;
const getId = () => `dndnode_${id++}`;  


  const initialElements = [

  ];

  export default function BikeFlowChart(){

    const reactFlowWrapper = useRef(null);

    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [elements, setElements] = useState(initialElements);
    
    //const onConnect = (params) => setElements((els) => addEdge(params, els));
    const onElementsRemove = (elementsToRemove) =>
      setElements((els) => removeElements(elementsToRemove, els));
  
    const onLoad = (_reactFlowInstance) =>
      setReactFlowInstance(_reactFlowInstance);
  
    const onDragOver = (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    };

    const onDrop = (event) => {
      event.preventDefault();
      
      if (reactFlowInstance){
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const nodeType = event.dataTransfer.getData('application/nodeType');
        const pointType = event.dataTransfer.getData('application/pointType');
        console.log(nodeType)
        console.log(pointType)
        const type = nodeType
        const width = 100

        const position = reactFlowInstance.project({
          x: event.clientX-width*(2/3) , //should do this properly but 2/3 kinda works
          y: event.clientY ,
        });
        const newNode = {
          id: getId(),
          type,
          position,
          connectable:false,
          style: {
            width: width
          },
          data: {label: (
              <>
              <text>Point {id} {"\n"}</text>
              <text>({pointType}) </text>
              </>
            ),},
        };
        setElements((es) => es.concat(newNode));
      }
    };    

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
          >
            <Controls />
            <Background />
          </ReactFlow>
        </div>
      <ToolbarFlow />
      </ReactFlowProvider>
      
    </div>
    );
  }