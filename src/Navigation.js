import {
    Nav,
    Navbar,
    NavDropdown,
    Container
} from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Navigation = (props) => {

    const history = useHistory();
    const userName = props.userName;

    const handleClick = () => {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="navigation">
            <Navbar className="w-100 mb-3" bg="secondary" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Product CRUD</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav>
                            <NavDropdown title={userName} id="basic-nav-dropdown">
                                <NavDropdown.Item href="#">Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleClick}>Log Out</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default Navigation;