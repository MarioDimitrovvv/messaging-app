import { Redirect, Route, Switch } from 'react-router-dom';

import Header from '../Header';
import Auth from '../Auth';
import Users from '../Users';
import Friends from '../Friends';

import './App.css'
import { useId } from '../../context/IdContext';
import { SocketProvider } from '../../context/Socket';
import ProtectedRoute from '../../context/ProtectedRoutes';

function App() {

    const { id } = useId();
    
    return (
        <div className="app">
            <SocketProvider id={id}>
                <Header />
                <Switch>
                    <Route exact path="/" render={() => <Redirect to="/messages/:id" />} />
                    <ProtectedRoute exact path="/messages/:id" component={Friends} />
                    <ProtectedRoute exact path="/users" component={Users} />
                    <Route exact path="/about" render={() => <h1>About Us Page</h1>} />
                    <Route exact path="/auth" component={Auth} />
                    <Route path="*" component={() => "404 NOT FOUND"} />
                </Switch>
            </SocketProvider>
        </div>
    );
}

export default App;
