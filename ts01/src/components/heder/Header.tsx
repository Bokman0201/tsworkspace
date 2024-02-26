import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

export const Header: React.FC = () => {

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
                        <Nav.Link href="/login">login</Nav.Link>
                        <Nav.Link href="/signin">signin</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
    );
}
