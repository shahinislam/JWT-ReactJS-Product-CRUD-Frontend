import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

const Protected = (props) => {

    const Component = props.Component;
    const history = useHistory();
    const [userName, setUserName] = useState('');

    useEffect(() => {

        const token = localStorage.getItem('token');

        if (token) {

            fetch('http://127.0.0.1:8000/api/auth/me', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                },
            })
                .then(res => {

                    res.json().then((result) => {

                        console.log(result);

                        if (result.message === 'Unauthenticated.') {
                            history.push('/');
                        }
                        else {
                            setUserName(result.name);
                        }
                    });
                })
        }

        if (!token) {
            history.push('/');
        }

    }, [])

    return (
        <div className="protected">
            <Component userName={userName} />
        </div>
    );
}

export default Protected;
