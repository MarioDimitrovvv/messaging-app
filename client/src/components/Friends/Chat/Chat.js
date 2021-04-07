import { Button, Container, Form, FormControl, InputGroup } from 'react-bootstrap';
import ScrollableFeed from 'react-scrollable-feed'
import Message from '../Message';

import './Chat.css'

const Chat = ({
    isNewConversation,
    messages,
    message,
    id,
    handleChange,
    handleSubmit,
}) => {
    return (
        <div className="chat-container">
            <ScrollableFeed className="scroller">
                {isNewConversation ? <div>Start new conversation</div> : null}
                <Container className="messages">
                    {messages.map((x, i) => <Message key={x._id} sender={x.sender} message={x.message} id={id} last={messages.length - 1 === i ? true : false} />)}
                </Container>
                <Form onSubmit={(e) => handleSubmit(e)} className="form">
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Aa"
                            aria-label="Aa"
                            aria-describedby="basic-addon2"
                            onChange={handleChange}
                            value={message}
                        />
                        <InputGroup.Append>
                            <Button as="input" variant="primary" type="submit" value="Submit" />
                        </InputGroup.Append>
                    </InputGroup>
                </Form>
            </ScrollableFeed>
        </div>
    )
}

export default Chat;

