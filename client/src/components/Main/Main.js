import { useState } from 'react';
import { useUser } from '../../context/UserContext';

import Message from '../Message';

const Main = ({ messages, setMessages, demo }) => {

    const [text, setText] = useState([]);

    const {user} = useUser();

    const sendMessage = () => {
        fetch('https://test-79aed.firebaseio.com/test.json', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ text, user })
        })
            .then(res => res.json())

        setText('');
    }

    return (
        <div className="main">
            {user && <div>Welcome, {user}</div>}
            <input value={text} onChange={e => setText(e.target.value)} />
            <button type="submit" onClick={sendMessage}>Send!</button>
            {messages && Object.keys(messages).map(x => {
                return (
                    <Message message={messages[x].text} user={messages[x].user} key={x} />
                )
            })}
        </div>
    )
}

export default Main;