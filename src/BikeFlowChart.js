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

import './dnd.css';

  let id = 0;
  const getId = () => `dndnode_${id++}`;  

  const initialElements = [
  ];

  const img_link = 'https://ep1.pinkbike.org/p5pb20979226/p5pb20979226.jpg';

  export default function BikeFlowChart(){

    const[select0,setSelect0] = useState(null);
    const[select1,setSelect1] = useState(null);

    const reactFlowWrapper = useRef(null);

    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [elements, setElements] = useState(initialElements);

    
    const addLink = () => {
      const params =  {id: `${select0}-${select1}`,source: select0,target: select1,type: 'straight'}
      setElements((els) => addEdge(params, els))
    }

    const addShock = () => {
      const params =  {id: `${select0}-${select1}`,source: select0,target: select1,type: 'straight',style: { stroke: 'red' }}
      setElements((els) => addEdge(params, els))
    }

    const clearAll = () => {
      setElements([])
    }
    
    //const onConnect = (params) => setElements((els) => addEdge(params, els));
    const onElementsRemove = (elementsToRemove) =>
      setElements((els) => removeElements(elementsToRemove, els));
  
    const onLoad = (_reactFlowInstance) =>
      setReactFlowInstance(_reactFlowInstance);
  
    const onDragOver = (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    };

    const zoom = reactFlowWrapper.current
    console.log(zoom)

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
          id: getId(), type, position, connectable:false,
          style: {
            width: width
          },
          data: {
            label: (  <>Point {id} {"\n"} *{pointType}* </>)
          },
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
              ba
              //nodeTypes={nodeTypes}
            >
              <Controls />
              <Background style={ { backgroundImage: `url(${img_link})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: `100% auto`}}/>
            </ReactFlow>
          </div>
        <ToolbarFlow addLink = {addLink}
                    addShock = {addShock} 
                    clearAll = {clearAll} 
                    setSelect0 = {setSelect0} 
                    setSelect1 = {setSelect1}/>
        </ReactFlowProvider>
    </div>
    );
  }