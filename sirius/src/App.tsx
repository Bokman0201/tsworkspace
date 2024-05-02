import React, { useEffect, useLayoutEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { LoginPage } from './component/login/LoginPage';
import { Home } from './component/home/Home';
import { Footer } from './component/template/Footer';
import { Header } from './component/template/Header';
import { ChatHome } from './component/chat/ChatHome';
import SockJS from "sockjs-client";
import useClientInfo from './component/store/UserStoer';
import { MyPageMain } from './component/client/mypage/MypageMain';
import { Infoupdate } from './component/client/mypage/Infoupdate';



const App: React.FC = () => {
  const location = useLocation();

  const { clientInfo, setClientInfo, deleteClientInfo } = useClientInfo();
  const sessionClient = (sessionStorage.getItem("clientInfo"))


  useLayoutEffect(()=>{

    console.log(clientInfo.clientId)
    if(sessionClient === null){
      deleteClientInfo();
    }

    
    if(sessionClient !== null){
      setClientInfo(JSON.parse(sessionClient));
    }

  },[sessionClient]);

  let socket: WebSocket;

  

  useEffect(() => {

    const sock = new SockJS('http://localhost:8080/ws'); // SockJS를 사용하여 연결

    // 웹소켓 연결
    socket = sock as WebSocket;

    // 연결 시 이벤트 핸들러
    socket.onopen = () => {
      console.log('WebSocket 연결됨');

      if(sessionClient !== null){

        const loginData = {
          type:"login",
          clientId:clientInfo.clientId,
          clientNick:clientInfo.clientNick
        }
        socket.send(JSON.stringify(loginData));
      }
    };

    // 메시지 수신 이벤트 핸들러
    socket.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
    };

    // 연결 종료 이벤트 핸들러
    socket.onclose = () => {
      console.log('WebSocket 연결 종료됨');
    };

    // 컴포넌트 언마운트 시 웹소켓 연결 종료
    return () => {
      socket.close();
    };
  }, [clientInfo]);

  return (
    <div>
      {location.pathname !== '/login' && (
        <div className=''>
          <Header />
        </div>
      )}

      <div className='container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='/chat' element={<ChatHome />} />
          <Route path='/mypage' element={<MyPageMain />} />
          <Route path='/infoupdate' element={<Infoupdate />} />
        </Routes>
      </div>

      {location.pathname !== '/login' && (
        <div style={{ position: "fixed", bottom: 0 }}>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default App;
