import React, { useState, useEffect } from 'react';

const Home = () => {
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        fetch('/time').then(res => res.json()).then(data => {
          setCurrentTime(data.time);
        });
      }, []);
    
    return ( 
        <div>
            <h1>Home</h1>
            <p>The current time is {currentTime}.</p>
        </div>
    )
}

export default Home;