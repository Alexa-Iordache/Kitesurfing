import React from 'react';
import './App.css';
import Login from './login-page';
import Dashboard from './dashboard';
import { Route, Routes, Navigate } from 'react-router-dom';
import history from './history';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Routes history={history}>
          <Route path="/login-page" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={ <Navigate to = "/login-page"/> } />
        </Routes>
      </div>
    );
  }
}

export default App;
