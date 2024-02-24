import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
import { Header } from './components/heder/Header';
import { Login } from './components/client/Login';
import { Container } from 'react-bootstrap';

const App: React.FC = () => {
  return (
    <div className="">


      <div className='container-fluid'>
        <Header />
      </div>
      <Container>
        <Routes>
          <Route path='/login' element={<Login />} />
        </Routes>
      </Container>

    </div>
  );
}

export default App;
