import {useEffect} from 'react';

import {useStoreState} from 'react-flow-renderer';

export default function BikeFlowUpdateHandler ({shock,
                                                reactFlowWrapper,
                                                setBikeData,
                                                changeFlag,
                                                params}) {

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
        
        const pars = {
            wheelbase: params.wheelbase,
            chainring_teeth: params.chainring_teeth,
            cassette_teeth: params.cassette_teeth,
            wheel_size: params.wheel_size,
            p2mm: 1.3379530916844349,
            cog_height: params.cog_height
            }; //unhardcode these i beg you at some point

        const data = {points:points,links:links,shock:shock,params:pars};
        return(data);
    }

  return(null);
}