import {
    Nav,
    Navbar,
    NavDropdown,
    Container
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';

const Navigation = () => {

    const [user, setUser] = useState('');
    const history = useHistory();

    useEffect(() => {

        const token = localStorage.getItem('token');

        fetch('http://127.0.0.1:8000/api/auth/me', {
            method: 'POST',
            headers: { "Authorization": "Bearer " + token },
        })
            .then(res => {
                return res.json();
            })
            .then((result) => {

                // console.log(result);

                setUser(result.name);
            })
    }, [])

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
                            <NavDropdown title={user} id="basic-nav-dropdown">
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