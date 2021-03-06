import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { IdProvider } from './context/IdContext';
import { UserProvider } from './context/UserContext';
import { AlertProvider } from './context/AlertContext';

import App from './components/App';

import './index.css';
import { LoadedProvider } from './context/LoadedProvider';

ReactDOM.render(
    <React.StrictMode>
        <UserProvider>
            <IdProvider>
                <AlertProvider>
                    <LoadedProvider>
                        <Router>
                            <App />
                        </Router>
                    </LoadedProvider>
                </AlertProvider>
            </IdProvider>
        </UserProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
