import React, { useState, useEffect } from 'react';
import { socket } from '../socket';
import { ConnectionState } from './ConnectionState';
import { ConnectionManager } from './ConnectionManager';
import { Events } from './Events';
import { MyForm } from './MyForm';
import GaugeChart from 'react-gauge-chart'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import moment from 'moment';


const dateFormatter = date => {
    return moment(date).format('HH:mm:ss');
  };

const Temperature = () => {

    const [isConnected, setIsConnected] = useState(socket.connected);
    const [temperatures, setTemperatureEvents] = useState([]);

  useEffect(() => {
    
    console.log("useEffect")
    
    fetch('/api/get_temperatures').then(res => res.json()).then(data => {
      setTemperatureEvents(data);
    });
    
    
    socket.timeout(5000).emit('join', '')

    function onConnect() {
      setIsConnected(true);
      console.log('join')
      socket.timeout(5000).emit('join', '')
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onTemperatureEvent(value) {
      console.log(value)
      setTemperatureEvents(previous => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('temperature', onTemperatureEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('temperature', onTemperatureEvent);
    };
  }, []);

  

    return ( 
        
        

        <div>
            <h1>Temperature</h1>
            <ConnectionState isConnected={ isConnected } />
            {/*
            <Events events={ temperatures } />
            <ConnectionManager />
            <MyForm />
            */}

            <GaugeChart id="gauge-chart5"
                nrOfLevels={420}
                arcsLength={[0.3, 0.5, 0.2]}
                colors={['#5BE12C', '#F5CD19', '#EA4228']}
                percent={temperatures.length > 0 ? temperatures.at(-1).t / 100.0 : 0}
                arcPadding={0.02}
                animate={false} 
                textColor={'#bbbbbb'}
                formatTextValue={value => value+"°C"}
            />
            
            {temperatures.length > 0 ?
            
            <div style={{ width: '100%', height: 300 }}>
            
                
                <ResponsiveContainer>
                    <LineChart data={temperatures} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" /> 
                        <XAxis dataKey="x" type="number" scale="time" domain={[temperatures[0].x, temperatures[temperatures.length - 1].x]} tickFormatter={dateFormatter} />  
                         <YAxis /> 
                        <Tooltip labelFormatter={value => {return moment(value).format('HH:mm:ss');}}  /> 
                        <Legend /> 
                        <Line type="monotone" dataKey="t" stroke="#8884d8" /> 
                    </LineChart> 
                    
                </ResponsiveContainer>
               
                
            </div> 
            : "No data"
            }
            

        </div>
    )
}

export default Temperature;