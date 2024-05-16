import React, { useEffect, useLayoutEffect, useState } from 'react';
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

import './App.css';
import { InviteList } from './component/client/invite/InviteList';
import { FriendsList } from './component/friend/FriendsList';
import { GroupsMain } from './component/groups/GroupMain';
import { GroupChatting } from './component/groups/GroupChatting';



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

    const sock = new SockJS(`${process.env.REACT_APP_REST_API_URL}/ws`); // SockJS를 사용하여 연결

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


  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [size, setSize] = useState<number>(0);

  const resizeListener = () => {
      setInnerHeight(window.innerHeight);
  };
  useEffect(() => {
      window.addEventListener("resize", resizeListener);
      console.log("innerHeight", innerHeight);

      let chattingRoomSize = innerHeight - 183;
      setSize(chattingRoomSize)
      return () => {
          window.removeEventListener("resize", resizeListener);
      };
  }, [innerHeight]); // 빈

  return (
    <div>
      {location.pathname !== '/login' && (
        <div className=''>
          <Header size={size}/>
        </div>
      )}

      <main className='container-fluid'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='/chat' element={<ChatHome />} />
          <Route path='/mypage' element={<MyPageMain />} />
          <Route path='/infoupdate' element={<Infoupdate />} />
          <Route path='InviteList' element={<InviteList/>}/>
          <Route path='/friend' element={<FriendsList/>}/>
          <Route path='/group' element={<GroupsMain/>}/>
          <Route path='/groupChat' element={<GroupChatting size={size}/>}/>
        </Routes>
      </main>

      {location.pathname !== '/login' && (
        <footer style={{ position: "fixed", bottom: 0 }}>
          <Footer />
          <footer>1</footer>
        </footer>
      )}
    </div>
  );
};

export default App;
