import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Card, Form } from 'react-bootstrap';

const Register = () => {
    const [validated, setValidated] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');
    const history = useHistory();

    const handleSubmit = (event) => {

        const form = event.currentTarget;

        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }

        setValidated(true);

        const register = { name, email, password, password_confirmation };

        fetch('http://127.0.0.1:8000/api/auth/register', {
            method: 'POST',
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify(register),
        })
            .then(res => {
                return res.json();
            })
            .then(result => {

                console.log(result);

                if (result.user) {
                    history.push('/');
                }
            });
    };


    return (
        <div className="register">

            <Card className="col-md-4 offset-md-4 mt-5">
                <Card.Body>
                    <Card.Title className="h1 text-center">Create New Account</Card.Title>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Enter name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a name.
                            </Form.Control.Feedback>
                        </Form.Group>

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
                        <Form.Group className="mb-3" controlId="formBasicPassword2">
                            <Form.Label>Password Confirm</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password Confirm"
                                required
                                value={password_confirmation}
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                            />

                        </Form.Group>

                        <div className="d-grid gap-2">
                            <Button variant="success" type="submit">
                                Register
                            </Button>
                        </div>

                        <div className="mt-2">
                            <Link to="/login">I have already a account</Link>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Register;