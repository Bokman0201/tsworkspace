import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { useClientStore } from "../../store/client/clientStore";

export const Header: React.FC = () => {

    //여기에 주스탄드에 있는 내용 꺼내
    const { clientEmail, clientName, clientJoinDate } = useClientStore();

    const handleLogout = () => {
        sessionStorage.removeItem("userInfo")
        useClientStore.setState({
            clientEmail: null,
            clientName: null,
            clientJoinDate: null,
        });
    }
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Navbar.Brand href="/">myapp</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/">home</Nav.Link>
                    <Nav.Link href="/link">Link</Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                            Another action
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                            Separated link
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav>
                    {clientEmail ? (
                        <>
                            <Nav.Link href="/mypage">mypage</Nav.Link>
                            <Nav.Link > <span onClick={handleLogout}>logout</span></Nav.Link>
                        </>

                    ) : (<>
                        <Nav.Link href="/login">login</Nav.Link>
                        <Nav.Link href="/signin">signin</Nav.Link>
                    </>
                    )}

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
