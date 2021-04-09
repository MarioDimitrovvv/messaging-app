import { Col, Row } from 'react-bootstrap';
import './Message.css';

let xs = 12;
const Message = ({
    sender,
    message,
    id,
    last
}) => {
    let isSender = 'message';
    if (sender === id) {
        xs = { offset: 8 };
        isSender += ' sending';
    } else {
        xs = 4;
        isSender = 'message';
    }
    
    last ? isSender += ' last' : isSender += ' not-last';
    
    return (
        <Row>
            {sender === id && <Col sm={8}></Col>}
            <Col xs={xs} as="div" className={isSender}>
                {message.trim()}
            </Col>
        </Row>
    )
}

export default Message;