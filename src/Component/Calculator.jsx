import React, { useState } from 'react';
import axios from 'axios';

const Calculator = () => {
  const [numberId, setNumberId] = useState('e');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const fetchNumbers = async () => {
    try {
      const res = await axios.get(`http://localhost:9876/numbers/${numberId}`);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError('Error fetching data from the server');
      setResponse(null);
    }
  };

  return (
    <div className='bg-green-100'>
      <h1>Average Calculator</h1>
      <div className='flex flex-col '>
        <label className='' htmlFor="numberId">Number ID:</label>
        <select className='border-2 border-black' id="numberId" value={numberId} onChange={e => setNumberId(e.target.value)}>
          <option value="p">Prime</option>
          <option value="f">Fibonacci</option>
          <option value="e">Even</option>
          <option value="r">Random</option>
        </select>
        <button onClick={fetchNumbers}>Fetch Numbers</button>
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {response && (
        <div>
          <h2>Results</h2>
          <p><strong>Numbers:</strong> {response.numbers.join(', ')}</p>
          <p><strong>Previous Window State:</strong> {response.windowPrevState.join(', ')}</p>
          <p><strong>Current Window State:</strong> {response.windowCurrState.join(', ')}</p>
          <p><strong>Average:</strong> {response.avg}</p>
        </div>
      )}
    </div>
  );
};

export default Calculator;
