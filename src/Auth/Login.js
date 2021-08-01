import { Button, Card, Form } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import Alert from 'react-bootstrap/Alert'

const Login = () => {

    const [alert, setAlert] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validated, setValidated] = useState(false);
    const history = useHistory();

    const handleSubmit = (event) => {

        const form = event.currentTarget;

        event.preventDefault();
        
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }

        setValidated(true);

        const login = { email, password };

        fetch('http://127.0.0.1:8000/api/auth/login', {
            method: 'POST',
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify(login),
        })
            .then(res => {
                return res.json()
            })
            .then(result => {

                console.log(result);

                if (result.error === 'Unauthorized') {

                    setAlert(true);

                }

                if (result.access_token) {
                    localStorage.setItem('token', result.access_token);

                    history.push('/products');
                }
            });
    };

    return (
        <div className="login">

            <Card className="col-md-4 offset-md-4 mt-5">
                <Card.Body>
                    <Card.Title className="h1 text-center">Sign In</Card.Title>

                    {alert &&
                        <Alert variant="danger" onClick={()=>setAlert(false)} dismissible>
                            Your Email or Password is Invalid!
                        </Alert>
                    }

                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid email.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid password.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <div className="d-grid gap-2">
                            <Button variant="success" type="submit">
                                Login
                            </Button>
                        </div>

                    </Form>
                    <hr />
                    <div className="text-center">
                        <Link to="/register" className="btn btn-primary">Create New Account</Link>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Login;