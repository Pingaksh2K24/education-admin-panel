import React, { useState } from 'react';
import Layout from './components/Layout';
import Login from './pages/login';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="App">
      <Layout />
    </div>
  );
}

export default App;