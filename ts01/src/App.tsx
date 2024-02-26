import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Router, Routes, useParams } from 'react-router-dom';
import { Header } from './components/heder/Header';
import { Login } from './components/client/Login';
import { Container } from 'react-bootstrap';
import { Signin } from './components/client/Signin';

const App: React.FC = () => {

  return (
    <div className="">
      <div className='container-fluid' >
        <Header />
      </div>
      <Container>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signin' element={<Signin />} />
        </Routes>
      </Container>

    </div>
  );
}

export default App;
