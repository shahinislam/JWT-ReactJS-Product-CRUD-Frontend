import { Button, Table, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navigation from "../Navigation";

const Index = (props) => {

    const [products, setProducts] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const userName = props.userName;

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
                if (!res.ok) {
                    throw Error('Could not fetch data from the resource.');
                }
                return res.json();
            })
            .then(result => {
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
        fetch('http://127.0.0.1:8000/api/products/' + productId, {
            method: 'DELETE'
        })
            .then((res) => {
                console.log(res);
                getData();
            })
    }

    return (
        <div className="index">

            <Navigation userName={userName} />

            <div className="container">
                <div className="mb-5">
                    <div className="">
                        <div className="mb-3">
                            <Link to="/products/create" className="btn btn-success">Create Product</Link>
                        </div>

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
                                                <Button variant="danger" className="float-right" size="sm" type="submit" onClick={() => handleDelete(product.id)}>Delete</Button>
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