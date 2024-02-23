import React from 'react';

// React Query
import { ReactQueryDevtools } from 'react-query/devtools';

const ReactQueryTools = () => {
    return process.env.NODE_ENV === 'development' ? <div className="top"><ReactQueryDevtools initialIsOpen={false} /></div> : <div className="top"></div>;
};

export default ReactQueryTools;