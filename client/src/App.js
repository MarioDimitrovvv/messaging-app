import { useState, useEffect } from 'react';

import { Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Main from './components/Main';
import Auth from './components/Auth';

import './App.css'

function App() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        demo();
    }, [messages]);

    const demo = () => {
        fetch('https://test-79aed.firebaseio.com/test/.json')
            .then(res => res.json())
            .then(data => setMessages(data))
            .catch(err => console.log(err));
    }

    return (
        <div className="app">
            <Header />
            <Switch>
                <Route exact path="/" render={() => <Main messages={messages} setMessages={setMessages} />} />
                <Route exact path="/auth" component={Auth} />
                <Route exact path="/about" render={() => <h1>About Us Page</h1>} />
            </Switch>
            <button onClick={demo}>Click Me</button>

        </div>
    );
}

export default App;
