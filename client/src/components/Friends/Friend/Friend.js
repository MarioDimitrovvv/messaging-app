import { ListGroup } from 'react-bootstrap';
import './Friend.css';

const Friend = ({
    name,
    userId,
    onClick,
    lastClicked
}) => {
    let variant = '';
    if (lastClicked === userId) {
        variant = 'info';
    } else {
        variant = 'light';
    }

    return (
        <ListGroup.Item onClick={() => onClick(userId)} variant={variant}>
            Name: {name}
        </ListGroup.Item>
    )
}

export default Friend;