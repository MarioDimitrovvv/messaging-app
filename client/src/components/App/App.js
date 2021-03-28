import { useState, useEffect, useMemo } from 'react';
import { Route, Switch } from 'react-router-dom';
//useLocation if needed

import Header from '../Header';
import Main from '../Main';
import Auth from '../Auth';
import Users from '../Users';
import Friends from '../Friends';

import './App.css'
import UserContext from '../../context/UserContext';
import IdContext from '../../context/IdContext';
import { getUser } from '../../actions/userActions';

function App() {
    // const location = useLocation();
    const [messages, setMessages] = useState({});
    const [user, setUser] = useState(null);
    const [id, setId] = useState(null);

    const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);
    const providerId = useMemo(() => ({ id, setId }), [id, setId]);

    useEffect(() => {
        getUser()
            .then(data => {
                setUser(data.name);
                setId(data._id);
            });
    }, []);

    useEffect(() => {
        demo();
    }, []);

    const demo = () => {
        fetch('https://test-79aed.firebaseio.com/test/.json')
            .then(res => res.json())
            .then(data => {
                setMessages(data);
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="app">
            <UserContext.Provider value={providerValue}>
                <IdContext.Provider value={providerId}>
                    <Header />
                    <Switch>
                        <Route exact path="/" render={() => <Main messages={messages} setMessages={setMessages} demo={demo} />} />
                        <Route exact path="/auth" component={Auth} />
                        <Route exact path="/messages/:id" component={Friends} />
                        <Route exact path="/users" component={Users} />
                        <Route exact path="/about" render={() => <h1>About Us Page</h1>} />
                    </Switch>
                    {/* <button onClick={demo}>Click Me</button> */}
                </IdContext.Provider>
            </UserContext.Provider>

        </div>
    );
}

export default App;
