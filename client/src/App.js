import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import loadUser from './utils/loadUser';

import Navbar from './components/layout/navbar.component';
import Landing from './components/layout/landing.component';
import Register from './components/auth/register.component';
import Login from './components/auth/login.component';
import Dashboard from './components/dashboard.component';
import PrivateRoute from './components/private-route/private-route.component';

loadUser(store);

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Navbar />
                <Route exact path="/" component={Landing} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Switch>
                    <PrivateRoute
                        exact
                        path="/dashboard"
                        component={Dashboard}
                    />
                </Switch>
            </Router>
        </Provider>
    );
}

export default App;
