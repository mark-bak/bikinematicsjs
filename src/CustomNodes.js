import React, {memo} from 'react';

import { Handle } from 'react-flow-renderer';


const CustomNode = memo(({data,isConnectable}) => {
    return (
        <>
            {data.label}
            <Handle type="source"
                    position="bottom" 
                    style = {{border: 'rgba(0,0,0,0)',width:'3px',height:'3px',backgroundColor:'rgb(255,0,0)'}}/>
        </>
        );
});

export {CustomNode}