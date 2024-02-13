import React, { useState, useEffect } from 'react';

// Icons
import WifiIcon from '@mui/icons-material/Wifi';
import SignalWifiStatusbarConnectedNoInternet4Icon from '@mui/icons-material/SignalWifiStatusbarConnectedNoInternet4';
import WifiFindIcon from '@mui/icons-material/WifiFind';

const Latency = () => {

    const [latency, setLatency] = useState(0);

    useEffect(() => {
        
        const worker = new Worker('/ServiceWorkers/LatencyWorker.js');

        worker.addEventListener('message', (event) => {
            const data = event.data;
            setLatency(data);
        });

        // Cleanup when the component unmounts
        return () => worker.terminate();
    }, []);

    return (
        <>
            {latency > 0 ? (
                <span style={{ fontSize: '12px', fontWeight: '550', whiteSpace: 'nowrap', color: latency <= 100 ? '#3B71CA' : '#DC4C64' }}>
                    {latency <= 100 ? 
                    (<WifiIcon sx={{ fontSize: '14px', marginBottom: '-2px' }}/>)
                    : 
                    (<SignalWifiStatusbarConnectedNoInternet4Icon sx={{ fontSize: '14px', marginBottom: '-2px' }}/>)} {`${Math.round(latency)}ms`}
                </span>
            )
            : 
            (
                <span style={{ fontSize: '12px', fontWeight: '550', whiteSpace: 'nowrap', color: '#3B71CA' }}>
                    <WifiFindIcon sx={{ fontSize: '14px', marginBottom: '-2px' }}/>
                </span>
            )}
        </>
    );
};

export default Latency;