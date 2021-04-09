import { Redirect, Route, Switch } from 'react-router-dom';

import Header from '../Header';
import Auth from '../Auth';
import Users from '../Users';
import Friends from '../Friends';
import About from '../About';

import { useId } from '../../context/IdContext';
import { SocketProvider } from '../../context/Socket';
import ProtectedRoute from '../../context/ProtectedRoutes';
import AlertSetter from '../AlertSetter';
import useError from '../../hooks/useError';

import './App.css'

function App() {

    const { id } = useId();
    const { ...alert } = useError();

    return (
        <div className="app">
            <SocketProvider id={id}>
                <Header />
                {alert && <AlertSetter variant={alert.type} alert={alert.text}/>}
                <Switch>
                    <Route exact path="/" render={() => <Redirect to="/messages/:id" />} />
                    <ProtectedRoute exact path="/messages/:id" component={Friends} />
                    <Route exact path="/users" component={Users} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/auth" component={Auth} />
                    <Route path="*" component={() => "404 NOT FOUND"} />
                </Switch>
            </SocketProvider>
        </div>
    );
}

export default App;
