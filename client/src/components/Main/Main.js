import { useState, useContext } from 'react';
import UserContext from '../../context/UserContext';

import Message from '../Message';

const Main = ({ messages, setMessages }) => {

    const [text, setText] = useState('');
    const {user, setUser} = useContext(UserContext)
    const sendMessage = () => {
        fetch('https://test-79aed.firebaseio.com/test.json', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ text })
        })
            .then(res => res.json())
            .then(data => console.log(data));

        setMessages([...Object.values(messages), text]);
        setText('');
    }

    return (
        <div className="main">
            {user && <div>Welcome, {user}</div>}
            <input value={text} onChange={e => setText(e.target.value)} />
            <button type="submit" onClick={sendMessage}>Send!</button>
            {messages && Object.values(messages).map(x => (
                <Message message={x.text} />
            ))}
        </div>
    )
}

export default Main;