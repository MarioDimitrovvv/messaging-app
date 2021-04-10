import { Redirect, Route, Switch } from 'react-router-dom';

import Header from '../Header';
import Auth from '../Auth';
import Users from '../Users';
import Friends from '../Friends';
import About from '../About';
import Footer from '../Footer';

import { useId } from '../../context/IdContext';
import { SocketProvider } from '../../context/Socket';
import ProtectedRoute from '../../context/ProtectedRoutes';
import AlertSetter from '../AlertSetter';
import useError from '../../hooks/useError';

import './App.css'
import Profile from '../Profile/Profile';
import { useLoading } from '../../context/LoadedProvider';
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
// import { LoadedProvider } from '../../context/LoadedProvider';

function App() {

    const { id } = useId();
    const { ...alert } = useError();
    const { loaded, setLoaded } = useLoading();

    useEffect(() => {
        setLoaded(true);
    }, [loaded])
    return (
        <div className="app">
            <SocketProvider id={id}>
                <Header />
                {alert && <AlertSetter variant={alert.type} alert={alert.text} />}
                {/* {loaded ? */}
                    <Switch>
                        <Route exact path="/" render={() => <Redirect to="/messages/:id" />} />
                        <ProtectedRoute exact path="/messages/:id" component={Friends} />
                        <Route exact path="/users" component={Users} />
                        <ProtectedRoute exact path="/profile" component={Profile} />
                        <Route exact path="/about" component={About} />
                        <Route exact path="/auth" component={Auth} />
                        <Route path="*" component={() => "404 NOT FOUND"} />
                    </Switch>
                    :
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                {/* } */}
                <Footer />
            </SocketProvider>
        </div>
    );
}

export default App;
