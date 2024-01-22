import logo from './logo.svg';
import './App.css';
import Message from './Message';
import React, { useState } from 'react';

function App() {

  const [counter, setCounter] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to WhatsApp clone <code>web-version</code>
        </p>
        <Message/>
        <div>
          <p>Counter: {counter}</p>
          <button onClick={() => setCounter(counter + 1)}>Increase</button>
        </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
