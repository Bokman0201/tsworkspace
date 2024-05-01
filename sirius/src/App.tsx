import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from './component/login/LoginPage';
import { Home } from './component/Home';

function App() {




  return (
    <div className='container'>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='login' element={<LoginPage/>}/>
    </Routes>
    </div>
  );
}

export default App;
