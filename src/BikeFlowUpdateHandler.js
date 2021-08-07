import {useEffect} from 'react';

import {useStoreState} from 'react-flow-renderer';

export default function BikeFlowUpdateHandler ({shock,
                                                reactFlowWrapper,
                                                setBikeData,
                                                changeFlag}) {

    const nodes = useStoreState(store => store.nodes)
    const edges = useStoreState(store => store.edges)

    //update the bikeData state in the app whenever the bike flowchart changes
    useEffect( () => {
        setBikeData(nodesToBikeData(
            nodes,
            edges,
            shock,
            reactFlowWrapper.current.getBoundingClientRect().height)
            )
        }
    ,[changeFlag])

    //turns the nodes fromat into the bikedata format
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

  return(null);
}