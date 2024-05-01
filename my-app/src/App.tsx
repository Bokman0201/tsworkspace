import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Router, Routes } from 'react-router';
import { KakaoRedirectPage } from './component/login/kakaoLogin/kakaoRedirectPage';
import { LoginPage } from './component/login/Login';
import { Home } from './component/home';
import { Error } from './component/error/errorPage';


//res={access_token=IU7Omo8boMkDPOqXCBDUqPd3vrJb0unEgN0KPXKXAAABjwuDTFOt1856Xp2T3g, token_type=bearer, refresh_token=0w1sM_C5D2qJc_zAcDU0uKeOK0V9G-fqZUsKPXKXAAABjwuDTE6t1856Xp2T3g, expires_in=21599, scope=profile_image profile_nickname, refresh_token_expires_in=5183999} 

function App() {

  const [data, setData] = useState();

  const getData = ()=>{
    

  }
  const userData = sessionStorage.getItem("info")


  useEffect(()=>{
    console.log(userData)
  },[])
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path="/oauth/redirected/kakao" element={<KakaoRedirectPage />}></Route>


        <Route path='/error' element={<Error/>}/>
      </Routes>


      {userData}
    </div>
  );
}

export default App;
