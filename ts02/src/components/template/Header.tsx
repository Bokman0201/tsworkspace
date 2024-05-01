import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useRecoilState } from 'recoil';
import { clientState } from '../../store/ClientStore';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
    const [clientStore, setClientStore] = useRecoilState(clientState);

    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        // root 요소에 다크 모드 클래스를 추가 또는 제거
        const rootElement = document.getElementById('root');
        if (rootElement) {
            if (darkMode) {
                rootElement.classList.remove('dark-mode');
            } else {
                rootElement.classList.add('dark-mode');
            }
        }
    };

    const handleCheckboxChange = () => {
        toggleDarkMode();
    };
    const [show, setShow] = useState<boolean>(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Navbar bg="primary" data-bs-theme="dark">
                <Container>
                    <NavLink to="/" className="navbar-brand">ALO</NavLink>
                    <Nav className="me-auto">
                        <Nav className="justify-content-center">
                            <NavLink className="align-items-center nav-link" to="/boardList">게시판</NavLink>
                        </Nav>

                        <Nav className="justify-content-center">
                            <NavLink className="align-items-center nav-link" to="/groupList">그룹</NavLink>
                        </Nav>
                        <Nav className="justify-content-center">
                            <NavLink className="align-items-center nav-link" to="/mygroup">내 그룹</NavLink>
                        </Nav>
                    </Nav>
                </Container>
                <Nav>

                    <div className="form-check form-switch">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckDefault"
                            onChange={handleCheckboxChange}
                            checked={darkMode}
                        />
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                        </label>
                    </div>
                </Nav>
                <Nav>
                    <div className='me-2'>
                        <img onClick={handleShow} style={{ borderRadius: "50%" }} src='https://picsum.photos/id/237/25/25' />
                    </div>
                </Nav>
            </Navbar>


            <Offcanvas show={show} onHide={handleClose} placement='end'>
                <Container>

                    <Offcanvas.Header closeButton >
                        <Offcanvas.Title>
                            <div className='row'>
                                <div className='col'>
                                    <img style={{ borderRadius: "50%" }} src='https://picsum.photos/id/237/30/30' />
                                </div>
                                <div className='col'>
                                    <div className='row'>
                                        <div className='col'>
                                            {clientStore.clientEmail}
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col'>
                                            {clientStore.clientName}
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <hr />
                    <Offcanvas.Body>
                        ul li로 이것저것 기능 넣기
                    </Offcanvas.Body>
                </Container>
            </Offcanvas>
        </>
    );
}

export default Header;
