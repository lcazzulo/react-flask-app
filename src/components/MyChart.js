import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import moment from 'moment';

const dateFormatter = date => {
    return moment(date).format('HH:mm:ss');
  };

export function MyChart ({temperatures})  {
    return (
        <>
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
        </>
    )
}