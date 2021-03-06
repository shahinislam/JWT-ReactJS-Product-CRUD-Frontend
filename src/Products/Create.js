import { Button, Card, Form } from 'react-bootstrap';
import { useState, Component } from "react";
import { useHistory } from "react-router-dom";
import Navigation from '../Navigation';

const Create = () => {

    const [validated, setValidated] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [imageError, setImageError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sweet, setSweet] = useState(false);
    const history = useHistory();

    const handleSubmit = (event) => {

        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {

            event.stopPropagation();

            setValidated(true);

            return false;
        }

        // console.warn(title, description, price, image);

        setIsLoading(true);

        const token = localStorage.getItem('token');

        const formData = new FormData();

        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('image', image);

        fetch('http://127.0.0.1:8000/api/products', {
            method: 'POST',
            headers: { "Authorization": "Bearer " + token },
            body: formData,
        })
            .then(res => {
                return res.json();
            })
            .then((result) => {

                console.log(result);

                if (result.success) {
                    history.push('/products');
                }

                setImageError(result.image);

                setIsLoading(false);
            })
    }

    return (
        <div className="create">

            <Navigation />

            <div className="d-flex justify-content-center">
                <div className="col-md-6">
                    <Card>
                        <Card.Title className="text-center">
                            <h1>Create Product</h1>
                        </Card.Title>
                        
                        <Card.Body>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Title"
                                        required
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        This field is required
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea" rows={3}
                                        required
                                        placeholder="Enter Description..."
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        This field is required
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Price"
                                        required
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        This field is required
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control
                                        type="file"
                                        placeholder="Image"
                                        onChange={(e) => setImage(e.target.files[0])}
                                        isInvalid={imageError ? true : false}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {imageError}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {!isLoading &&
                                    <Button variant="success" type="submit" >
                                        Create Product
                                    </Button>
                                }
                                {isLoading &&
                                    <Button variant="secondary" type="submit" disabled>
                                        Creating Product...
                                    </Button>
                                }
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Create;