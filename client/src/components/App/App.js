import { useState, useEffect, useMemo } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import Header from '../Header';
import Main from '../Main';
import Auth from '../Auth';

import './App.css'
import UserContext from '../../context/UserContext';

function App() {
    const location = useLocation();
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState(null)

    const providerValue = useMemo(() => ({user, setUser}), [user, setUser]);
    
    useEffect(() => {
        console.log('Location change');
    }, [location])

    const demo = () => {
        fetch('https://test-79aed.firebaseio.com/test/.json')
            .then(res => res.json())
            .then(data => setMessages(data))
            .catch(err => console.log(err));
    }

    return (
        <div className="app">
            <UserContext.Provider value={providerValue}>
                <Header />
                <Switch>
                    <Route exact path="/" render={() => <Main messages={messages} setMessages={setMessages} />} />
                    <Route exact path="/auth" component={Auth} />
                    <Route exact path="/about" render={() => <h1>About Us Page</h1>} />
                </Switch>
                <button onClick={demo}>Click Me</button>
            </UserContext.Provider>

        </div>
    );
}

export default App;
