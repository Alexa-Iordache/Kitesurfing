import React from 'react';
import './App.css';
import Login from './login-page';
import Dashboard from './dashboard';
import SignUp from './signUp';
import { Route, Routes, Navigate } from 'react-router-dom';
import history from './history';

// this is a PRESENTATIONAL component
// it is mainly concerned with receiving the data via props and displaying them
// it does not specify how the data is loaded or mutated and don't have their own states.


// the class component 'App' requires the extension from React.Component (there was used inheritance)
// and creates a render function which returns a React component 
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Routes history={history}>
          <Route path="/login-page" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={ <Navigate to = "/login-page"/> } />
        </Routes>
      </div>
    );
  }
}

export default App;
