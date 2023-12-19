import React, { useState, useEffect } from 'react';
import ToggleButton from 'react-toggle-button'
import { socket } from '../socket';
import { ConnectionState } from './ConnectionState';
import { MyGauge }  from './MyGauge';
import { MyChart }  from './MyChart';
import { LCD } from './Lcd';


const Temperature = () => {

    const [isConnected, setIsConnected] = useState(socket.connected);
    const [temperatures1, setTemperatureEvents1] = useState([]);
    const [temperatures2, setTemperatureEvents2] = useState([]);
    const [temperatures3, setTemperatureEvents3] = useState([]);
    const [temperatures4, setTemperatureEvents4] = useState([]);

  useEffect(() => {
    
    console.log("useEffect")
    
    fetch('/api/get_temperatures').then(res => res.json()).then(data => {
      setTemperatureEvents1(data);
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
      setTemperatureEvents1(previous => [...previous, value]);
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
            
            <div className="container">
              <div className="row">
              <div className="col-sm-2">
                  <h6>T mesured</h6>
              </div>
                <div className="col-sm-2">
                  <MyGauge key="gauge-1" temperature={temperatures1.length > 0 ? temperatures1.at(-1).t : 0} />
                </div>
                <div className="col-sm-2">
                  <MyGauge key="gauge-2" temperature={-30} /> 
                </div>
                <div className="col-sm-2">
                  <MyGauge key="gauge-3" temperature={temperatures1.length > 0 ? temperatures1.at(-1).t : 0} /> 
                </div>
                <div className="col-sm-2">
                  <MyGauge key="gauge-4" temperature={temperatures1.length > 0 ? temperatures1.at(-1).t : 0} /> 
                </div>
              </div>
              <div className="row">
              <div className="col-sm-2">
                <h6>T setpoint</h6>
              </div>
                <div className="col-sm-2">
                  <LCD key="lcd-1" value="10" />
                </div>   
                <div className="col-sm-2">
                  <LCD key="lcd-2" value="10" />
                </div>   
                <div className="col-sm-2">
                  <LCD key="lcd-3" value="10" />
                </div>   
                <div className="col-sm-2">
                  <LCD key="lcd-4" value="10.1" />
                </div>   
              </div>
              <div className="row">
              <div className="col-sm-2">
                <h6>Event state</h6>
              </div>
                <div className="col-sm-2">
                  <LCD key="lcd-1" value="0" />
                </div>   
                <div className="col-sm-2">
                  <LCD key="lcd-2" value="0" />
                </div>   
                <div className="col-sm-2">
                  <LCD key="lcd-3" value="0" />
                </div>   
                <div className="col-sm-2">
                  <LCD key="lcd-4" value="0" />
                </div>   
              </div>
              <div className="row">
              <div className="col-sm-2">
                <h6>DO state</h6>
              </div>
                <div className="col-sm-2">
                  <LCD key="lcd-1" value="0" />
                </div>   
                <div className="col-sm-2">
                  <LCD key="lcd-2" value="0" />
                </div>   
                <div className="col-sm-2">
                  <LCD key="lcd-3" value="0" />
                </div>   
                <div className="col-sm-2">
                  <LCD key="lcd-4" value="0" />
                </div>   
              </div>
              <div className="row">
              <div className="col-sm-2">
                <h6>Memory area transfer</h6>
              </div>
                <div className="col-sm-2">
                  <LCD key="lcd-1" value="0" />
                </div>   
                <div className="col-sm-2">
                  <LCD key="lcd-2" value="0" />
                </div>   
                <div className="col-sm-2">
                  <LCD key="lcd-3" value="0" />
                </div>   
                <div className="col-sm-2">
                  <LCD key="lcd-4" value="0" />
                </div>   
              </div>
              <div className="row">
              <div className="col-sm-2">
                <h6>ON/OFF</h6>
              </div>
                <div className="col-sm-2">
                  <ToggleButton key="toggle-1" value={true} />
                </div>   
                <div className="col-sm-2">
                <ToggleButton key="toggle-1" value={true} />
                </div>   
                <div className="col-sm-2">
                <ToggleButton key="toggle-1" value={true} />
                </div>   
                <div className="col-sm-2">
                <ToggleButton key="toggle-1" value={true} />
                </div>   
              </div>
              <div className="row">
              <div className="col-sm-2">
                <h6>Input1 set value</h6>
              </div>
                <div className="col-sm-2">
                  <LCD key="lcd-1" value="0" />
                </div>   
                <div className="col-sm-2">
                  <LCD key="lcd-2" value="0" />
                </div>   
                <div className="col-sm-2">
                  <LCD key="lcd-3" value="0" />
                </div>   
                <div className="col-sm-2">
                  <LCD key="lcd-4" value="0" />
                </div>   
              </div>
              <div className="row">
              <div className="col-sm-2">
                <h6>Area1 soak time</h6>
              </div>
                <div className="col-sm-2">
                  <LCD key="lcd-1" value="0" />
                </div>   
                <div className="col-sm-2">
                  <LCD key="lcd-2" value="0" />
                </div>   
                <div className="col-sm-2">
                  <LCD key="lcd-3" value="0" />
                </div>   
                <div className="col-sm-2">
                  <LCD key="lcd-4" value="0" />
                </div>   
              </div>
              <div className="row">
              <div className="col-sm-2">
                <h6>Input2 set value</h6>
              </div>
                <div className="col-sm-2">
                  <LCD key="lcd-1" value="0" />
                </div>   
                <div className="col-sm-2">
                  <LCD key="lcd-2" value="0" />
                </div>   
                <div className="col-sm-2">
                  <LCD key="lcd-3" value="0" />
                </div>   
                <div className="col-sm-2">
                  <LCD key="lcd-4" value="0" />
                </div>   
              </div>
              <div className="row">
              <div className="col-sm-2">
                <h6>Area2 soak time</h6>
              </div>
                <div className="col-sm-2">
                  <LCD key="lcd-1" value="0" />
                </div>   
                <div className="col-sm-2">
                  <LCD key="lcd-2" value="0" />
                </div>   
                <div className="col-sm-2">
                  <LCD key="lcd-3" value="0" />
                </div>   
                <div className="col-sm-2">
                  <LCD key="lcd-4" value="0" />
                </div>   
              </div>
              <div className="row">
              <div className="col-sm-2">
                <h6>Alarm code</h6>
              </div>
                <div className="col-sm-2">
                  <LCD key="lcd-1" value="0" />
                </div>   
                <div className="col-sm-2">
                  <LCD key="lcd-2" value="0" />
                </div>   
                <div className="col-sm-2">
                  <LCD key="lcd-3" value="0" />
                </div>   
                <div className="col-sm-2">
                  <LCD key="lcd-4" value="0" />
                </div>   
              </div>
              <div className="row">
              <div className="col-sm-2">
                <h6>Voltage value monitor</h6>
              </div>
                <div className="col-sm-2">
                  <LCD key="lcd-1" value="0" />
                </div>   
                <div className="col-sm-2">
                  <LCD key="lcd-2" value="0" />
                </div>   
                <div className="col-sm-2">
                  <LCD key="lcd-3" value="0" />
                </div>   
                <div className="col-sm-2">
                  <LCD key="lcd-4" value="0" />
                </div>   
              </div>
              <div className="row">
              <div className="col-sm-2">
                <h6>Power value monitor</h6>
              </div>
                <div className="col-sm-2">
                  <LCD key="lcd-1" value="0" />
                </div>   
                <div className="col-sm-2">
                  <LCD key="lcd-2" value="0" />
                </div>   
                <div className="col-sm-2">
                  <LCD key="lcd-3" value="0" />
                </div>   
                <div className="col-sm-2">
                  <LCD key="lcd-4" value="0" />
                </div>   
              </div>
              <div className="row">
              <div className="col-sm-2">
                <h6>CT input monitor</h6>
              </div>
                <div className="col-sm-2">
                  <LCD key="lcd-1" value="0" />
                </div>   
                <div className="col-sm-2">
                  <LCD key="lcd-2" value="0" />
                </div>   
                <div className="col-sm-2">
                  <LCD key="lcd-3" value="0" />
                </div>   
                <div className="col-sm-2">
                  <LCD key="lcd-4" value="0" />
                </div>   
              </div>
              <div className="row">
              <div className="col-sm-2">
                <h6>Contact input state monitor</h6>
              </div>
                <div className="col-sm-2">
                  <LCD key="lcd-1" value="0" />
                </div>   
                <div className="col-sm-2">
                  <LCD key="lcd-2" value="0" />
                </div>   
                <div className="col-sm-2">
                  <LCD key="lcd-3" value="0" />
                </div>   
                <div className="col-sm-2">
                  <LCD key="lcd-4" value="0" />
                </div>   
              </div>


              
            </div>
            
            
                      
            {temperatures1.length > 0 ?
            <MyChart temperatures={temperatures1} /> : "No data"}
        </div>
    )
}

export default Temperature;