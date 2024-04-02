import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Router, Routes, useNavigate } from 'react-router-dom';
import { Home } from './components/Home';
import { Container } from 'react-bootstrap';
import Header from './components/template/Header';
import { Client } from './model/ClientModel';
import { Login } from './components/client/Login';
import { Signup } from './components/client/Signup';
import { BoardList } from './components/board/BoardList';
import { GroupList } from './components/group/GroupList';
import { useRecoilState } from 'recoil';
import { clientState } from './store/ClientStore';
import { MyGroup } from './components/group/MyGroup';
import { GroupDetail } from './components/group/GroupDetail';
import { Community } from './components/mygroup/Community';
import { CommunityBoardWrite } from './components/community/CommunityBoardWrite';
import { CommunityBoardDetail } from './components/community/CommunityBoardDetail';

function App() {
  const clientString = sessionStorage.getItem('client');
  const navigator = useNavigate();
  const [client, setClient] = useState<Client>({
    clientEmail: '',
    clientName: '',
    clientNick: '',
    clientJoinDate: '',
    clientBirth: '',
    affiliationId: 0
  });
  const [clientStore, setClientStore] = useRecoilState(clientState);



  useEffect(() => {
    if (clientString) {
      const parseClient = JSON.parse(clientString)
      setClient(parseClient);
      setClientStore(parseClient);
    }
    else {
      navigator("/login");
    }
  }, [clientString])

  useEffect(() => {
    //로그용
  }, [client])









  return (
    <div className="" >
      {/* endpoint 작성일때 헤더 제거 */}
      {client.clientEmail !== '' && (
        <Header />
      )}

      <Container>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />

          <Route path='/boardList' element={<BoardList />} />

          <Route path='/groupList' element={<GroupList />} />
          <Route path='/mygroup' element={<MyGroup />} />
          <Route path="/groupDetail" element={<GroupDetail />} />


          <Route path='/community' element={<Community />} />
          <Route
            path="/communityBoardWrite"
            element={
              <>
                <link href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" rel="stylesheet" />
                <CommunityBoardWrite />
              </>
            }
          />        

          <Route path='/communityBoardDetail' element={<CommunityBoardDetail/>}/>
          </Routes>
      </Container>


    </div>
  );
}

export default App;
