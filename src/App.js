import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import Routes from "./Routes";


function App() {
  return (
    <div className="app text-center">
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
