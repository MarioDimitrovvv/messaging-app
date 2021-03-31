import { useState, useEffect, useMemo } from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';

import Header from '../Header';
import Main from '../Main';
import Auth from '../Auth';
import Users from '../Users';
import Friends from '../Friends';

import './App.css'
import UserContext from '../../context/UserContext';
import IdContext from '../../context/IdContext';
import { getUser } from '../../actions/userActions';
import { SocketProvider } from '../../context/Socket';
import ProtectedRoute from '../../context/ProtectedRoutes';

function App() {

    const [messages, setMessages] = useState({});
    const [user, setUser] = useState(null);
    const [id, setId] = useState(null);

    const history = useHistory();
    const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);
    const providerId = useMemo(() => ({ id, setId }), [id, setId]);

    useEffect(() => {
        getUser()
            .then(data => {
                setUser(data.name);
                setId(data._id);
            });
    }, [user, id]);

    useEffect(() => {
        if(!user) {
            Redirect('/auth');
        }
        console.log('history is changed');
    }, [user, history]);

    return (
        <div className="app">
            <SocketProvider id={id}>
                <UserContext.Provider value={providerValue}>
                    <IdContext.Provider value={providerId}>
                        <Header />
                        <Switch>
                            <ProtectedRoute exact path="/" render={() => <Main messages={messages} setMessages={setMessages}  />} />
                            <Route exact path="/auth" component={Auth} />
                            <ProtectedRoute exact path="/messages/:id" component={Friends} />
                            <ProtectedRoute exact path="/users" component={Users} />
                            <Route exact path="/about" render={() => <h1>About Us Page</h1>} />
                            <Route path="*" component={() => "404 NOT FOUND"}/>
                        </Switch>
                    </IdContext.Provider>
                </UserContext.Provider>
            </SocketProvider>
        </div>
    );
}

export default App;
