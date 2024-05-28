import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
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
import { GroupDetail } from './component/groups/GroupDetail';
import { ChatContent } from './component/chat/ChatContent';
import { chatMessageType, messageType } from './component/types/ChatType';





const App: React.FC = () => {
  const location = useLocation();
  const navigator = useNavigate();

  const { clientInfo, setClientInfo, deleteClientInfo } = useClientInfo();
  const sessionClient = (sessionStorage.getItem("clientInfo"))
  useEffect(() => {
    if(!sessionClient){
      alert("로그인후 사용 가능합니다.")
      navigator("/login")
    }
  }, []);

  useLayoutEffect(() => {

    console.log(clientInfo.clientId)
    if (!sessionClient) {
      deleteClientInfo();
      navigator("/login")
    }


    if (sessionClient) {
      setClientInfo(JSON.parse(sessionClient));
    }

  }, [sessionClient]);

  const socketRef = useRef<WebSocket | null>(null); // 소켓을 null로 초기화합니다.
  const [messageList, setMessageList] = useState<messageType[]>([]);
  const [socketStatus, setSocketStatus] = useState<boolean>(false)

  useEffect(() => {
    const connectSocket = () => {
      const sock = new SockJS(`${process.env.REACT_APP_REST_API_URL}/ws`);
      socketRef.current = sock as WebSocket;

      const socket = socketRef.current;

      socket.onopen = () => {
        console.log('WebSocket 연결됨');
        setSocketStatus(true);

        if (sessionClient !== null) {
          const loginData = {
            type: "login",
            clientId: clientInfo.clientId,
            clientNick: clientInfo.clientNick,
          };
          socket.send(JSON.stringify(loginData));
        }
      };

      socket.onmessage = (event) => {
        const receivedMessage = JSON.parse(event.data);
        console.log(receivedMessage);
        setMessageList((prevMessageList) => [...prevMessageList, receivedMessage]);
      };

      socket.onclose = () => {
        console.log('WebSocket 연결 종료됨');
        setSocketStatus(false);
        // 일정 시간 후 재연결 시도
        setTimeout(() => {
          connectSocket();
        }, 2000); // 5초 후 재연결 시도
      };
    };

    connectSocket();

    // 컴포넌트 언마운트 시 웹소켓 연결 종료
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [clientInfo, sessionClient]);

  // sendMessage 함수 정의
  const sendMessage = (message: messageType) => {
    const socket = socketRef.current;
    if (socket !== null && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    } else {
      console.error('WebSocket 연결이 열려있지 않습니다.');
    }
  };

  useEffect(() => {
    console.log(messageList);
  }, [messageList]);


  // messageList 생성 
  // 보낸거 받은거 저장
  // 랜더링시 제거 & get 





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
    //<WebSocketProvider>

    <div>
      {location.pathname !== '/login' && (
        <div className=''>
          <Header sendMessage={sendMessage} setMessageList={setMessageList} />
        </div>
      )}


      <main className='container-fluid' style={{ marginTop: "70px" }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/chat' element={<ChatHome />} />
          <Route path='/mypage' element={<MyPageMain />} />
          <Route path='/infoupdate' element={<Infoupdate />} />
          <Route path='/InviteList' element={<InviteList />} />
          <Route path='/friend' element={<FriendsList />} /> {/* Corrected path */}
          <Route path='/group' element={<GroupsMain />} />
          <Route path='/group/detail' element={<GroupDetail />} />
          <Route path='/chatRoom' element={<ChatContent sendMessage={sendMessage} messageList={messageList} setMessageList={setMessageList} />} />
        </Routes>
      </main>


      {location.pathname !== '/login' && location.pathname !== '/chatRoom' && (
        <footer style={{ position: "fixed", bottom: 0 }}>
          <Footer />
          <footer>1</footer>
        </footer>
      )}
    </div>
    //</WebSocketProvider>
  );
};

export default App;
