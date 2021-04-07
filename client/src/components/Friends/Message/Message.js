import { Badge, Col, Row } from 'react-bootstrap';
import './Message.css';

let xs = 12;
let isSender = 'message';
const Message = ({
    sender,
    message,
    id,
    last
}) => {
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
                {/* <Badge className={isSender} pill variant='dark'>{message}</Badge> */}
                {message}
            </Col>
        </Row>
    )
}

export default Message;