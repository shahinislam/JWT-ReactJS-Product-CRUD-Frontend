import 'bootstrap/dist/css/bootstrap.min.css';

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Login from './Auth/Login';
import Register from './Auth/Register';
import Create from './Products/Create';
import Index from './Products/Index';
import Edit from './Products/Edit';
import Protected from './Protected';

function App() {

    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/products/create">
                        <Protected Component={Create} />
                    </Route>
                    <Route path="/products/:id/edit">
                        <Protected Component={Edit} />
                    </Route>
                    <Route path="/products">
                        <Protected Component={Index} />
                    </Route>
                    <Route path="/">
                        <Login />
                    </Route>
                </Switch>
            </Router>

        </div>
    );
}

export default App;