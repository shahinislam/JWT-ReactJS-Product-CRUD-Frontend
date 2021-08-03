import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import Navigation from "../Navigation";

const Edit = () => {

    const { id } = useParams();
    const [validated, setValidated] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [oldImage, setOldImage] = useState('');
    const [imageError, setImageError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {

        const token = localStorage.getItem('token');

        fetch('http://127.0.0.1:8000/api/products/' + id + '/edit', {
            headers: { "Authorization": "Bearer " + token },
        })
            .then(res => {
                return res.json();
            })
            .then(result => {
                setTitle(result.title);
                setDescription(result.description);
                setPrice(result.price);
                if (result.image) {
                    setOldImage(result.image);
                }
            })
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {

            event.stopPropagation();

            setValidated(true);

            return false;
        }

        const formData = new FormData();

        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('image', image);
        formData.append('_method', 'PATCH');

        setIsLoading(true);

        const token = localStorage.getItem('token');

        fetch('http://127.0.0.1:8000/api/products/' + id, {
            method: 'POST',
            headers: { Authorization: 'Bearer' + token, },
            body: formData,
        })
            .then(res => {
                return res.json();
            })
            .then((result) => {

                console.log(result);

                if (result.success) {
                    history.goBack();
                }

                setImageError(result.image);

                setIsLoading(false);
            })
    }

    return (
        <div className="edit">

            <Navigation />

            <div className="d-flex justify-content-center">
                <div className="col-md-6">
                    <Card>
                        <Card.Title className="text-center">
                            <h1>Edit Product</h1>
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
                                        placeholder="Enter Price"
                                        required
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        This field is required
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {oldImage &&
                                    <Row className="mb-3">
                                        <Col xs={6} md={4}>
                                            <Image width="200" src={`http://127.0.0.1:8000/storage/${oldImage}`} rounded />
                                        </Col>
                                    </Row>
                                }

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
                                    <Button variant="info" type="submit" >
                                        Update Product
                                    </Button>
                                }
                                {isLoading &&
                                    <Button variant="secondary" type="submit" disabled>
                                        Updating Product...
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

export default Edit;