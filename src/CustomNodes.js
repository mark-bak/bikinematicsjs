import React, {memo} from 'react';

import { Handle } from 'react-flow-renderer';


const CustomNode = memo(({data}) => (
        <>
                {data.label}
                <Handle isValidConnection = {true}
                        position="bottom" 
                        style = {{border: 'rgba(0,0,0,0)',width:'3px',height:'3px',backgroundColor:'rgb(255,0,0)'}}
                        isConnectable = {true}
                        />
        </>
));

export {CustomNode}