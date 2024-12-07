import React, { useState } from 'react';
import axios from 'axios';

const App: React.FC = () => {
    const [calls, setCalls] = useState([]);

    const fetchCalls = async () => {
        const response = await axios.get('http://localhost:3000/api/cad');
        setCalls(response.data);
    };

    return (
        <div>
            <h1>FiveM CAD</h1>
            <button onClick={fetchCalls}>Rufe Einsätze ab</button>
            <ul>
                {calls.map((call, index) => (
                    <li key={index}>{call.description}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;
