import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Layout from './components/Layout';
import Login from './pages/login';
import { toastConfig } from './utils/notification/config';
import 'react-toastify/dist/ReactToastify.css';
import './utils/notification/styles.css';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="App">
      {!isAuthenticated ? (
        <Login onLogin={() => setIsAuthenticated(true)} />
      ) : (
        <Layout />
      )}
      <ToastContainer {...toastConfig} />
    </div>
  );
}

export default App;