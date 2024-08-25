import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'Alphabets', label: 'Alphabets' },
    { value: 'Numbers', label: 'Numbers' },
    { value: 'Highest lowercase alphabet', label: 'Highest lowercase alphabet' }
  ];

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      console.log(parsedData);
      const postData = { data: parsedData.data };
      const res = await axios.post('http://localhost:5000/bfhl', postData);
      setResponse(res.data);
      console.log(res);
      setError(null);
    } catch (err) {
      setError('Invalid JSON input or API error');
      setResponse(null);
    }
  };

  const handleOptionChange = (selected) => {
    setSelectedOptions(selected || []);
  };

  const renderResponse = () => {
    if (!response) return null;

    let displayData = {};

    selectedOptions.forEach(option => {
      if (option.value === 'Alphabets' && response.alphabets) {
        displayData['Alphabets'] = response.alphabets;
      }
      if (option.value === 'Numbers' && response.numbers) {
        displayData['Numbers'] = response.numbers;
      }
      if (option.value === 'Highest lowercase alphabet' && response.highest_lowercase_alphabet) {
        displayData['Highest Lowercase Alphabet'] = response.highest_lowercase_alphabet;
      }
    });

    return (
      <div>
        <h4>Filtered Response</h4>
        {Object.entries(displayData).map(([key, value]) => (
          <div key={key}>
            <strong>{key}:</strong> {value.join(', ')}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="App">
      <h2>API Input</h2>
      <textarea
        value={jsonInput}
        onChange={handleInputChange}
        placeholder='Enter JSON input here'
      />
      <h3>Click Submit button to validate the Input and Select 'Multi Filter'</h3>
      <button onClick={handleSubmit}>Submit</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {response && (
        <>
          <h4>Multi Filter</h4>
          <Select
            isMulti
            options={options}
            onChange={handleOptionChange}
            className="select-dropdown"
          />

          {renderResponse()}
        </>
      )}
    </div>
  );
}

export default App;
