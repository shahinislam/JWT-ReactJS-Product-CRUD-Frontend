import { Button, Table, ButtonGroup } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert'
import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navigation from "../Navigation";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const Index = () => {

    const [products, setProducts] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [alert, setAlert] = useState(false);
    const history = useHistory();

    const getData = () => {

        const abortCont = new AbortController();

        const token = localStorage.getItem('token');

        fetch('http://127.0.0.1:8000/api/products', {
            signal: abortCont.signal,
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token
            },
        })
            .then(res => {
                return res.json();
            })
            .then(result => {
                // console.log(result);
                if(result.message === 'Unauthenticated.')
                {
                    history.push('/');
                }
                setProducts(result);
                setIsLoading(false);
                setError(null);
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('fetch aborted');
                }
                else {
                    setIsLoading(false);
                    setError(err.message);
                    console.log(err);
                }
            });

        return () => abortCont.abort();
    }


    useEffect(() => {

        getData();

    }, []);

    const handleDelete = (productId) => {

        const token = localStorage.getItem('token');

        fetch('http://127.0.0.1:8000/api/products/' + productId, {
            method: 'DELETE',
            headers: {
                "Authorization": "Bearer " + token
            },
        })
            .then(res => {
                return res;
            })
            .then((res) => {
                console.log(res);
                getData();
                setAlert(true);
            })
    }

    const showAlert = (productId) => {
        confirmAlert({
            title: 'Delete Confirm',
            message: 'Are you sure?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => handleDelete(productId)
                },
                {
                    label: 'No',
                    onClick: () => ''
                }
            ]
        });
    }

    return (
        <div className="index">

            <Navigation />

            <div className="container">
                <div className="mb-5">
                    <div className="">
                        <div className="mb-3">
                            <Link to="/products/create" className="btn btn-success">Create Product</Link>
                        </div>

                        {alert &&
                            <Alert variant="danger" onClick={() => setAlert(false)} dismissible>
                                <b>Product has been deleted successfully!</b>
                            </Alert>
                        }

                        {error && <p>{error}</p>}
                        {isLoading && <h2 className="text-center">Loading...</h2>}
                        <Table striped hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products && products.map((product, index) => (
                                    <tr key={product.id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            {product.image &&
                                                <img width="50" src={`http://127.0.0.1:8000/storage/${product.image}`} alt="" />
                                            }
                                        </td>
                                        <td>{product.title}</td>
                                        <td>{product.description}</td>
                                        <td>{product.price}</td>
                                        <td>
                                            <ButtonGroup aria-label="Basic example">
                                                <Link to={`/products/${product.id}/edit`} className="btn btn-sm btn-info">Edit</Link>
                                                <Button variant="danger" className="float-right" size="sm" type="submit" onClick={() => showAlert(product.id)}>Delete</Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index;