import React from 'react';
import logo from './logo.svg';
//import 'bootstrap/dist/css/bootstrap.min.css'
import './App.sass';

function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-6">number one</div>
        <div className="col-6">number two <span><i className="fas fa-home"></i></span></div>
      </div>
    </div>
  );
}

export default App;
