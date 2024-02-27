import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Router, Routes, useNavigate, useParams } from 'react-router-dom';
import { Header } from './components/heder/Header';
import { Login } from './components/client/Login';
import { Container } from 'react-bootstrap';
import { Signin } from './components/client/Signin';
import { Home } from './components/Home';
import { Provider } from 'react-redux';
import { Client } from './model/client';
import { useClientStore } from './store/client/clientStore';
import { MyPage } from './components/client/Mypage';
import { UpdateInfo } from './components/client/UpdateInfo';

const App: React.FC = () => {

  const userString = sessionStorage.getItem("userInfo");

  const navigator = useNavigate();



  useEffect(() => {
    console.log(userString)
    if (userString) {
      const userInfo = JSON.parse(userString);
  
      // set 함수를 이용하여 useClientStore에 상태 업데이트
      useClientStore.setState({
        clientEmail: userInfo.clientEmail,
        clientName: userInfo.clientName,
        clientJoinDate: userInfo.clientJoinDate,
      });
    }
  }, [userString ,useClientStore]);

  return (
    <div className="">
      <div className='container-fluid' >
        <Header />
      </div>

      <Container>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/mypage' element={<MyPage />}/>
          <Route path='/login' element={<Login />} />
          <Route path='/signin' element={<Signin />} />
          {/* <Route path='/update' element={<UpdateInfo />} /> */}
        </Routes>
      </Container>

    </div>
  );
}

export default App;
