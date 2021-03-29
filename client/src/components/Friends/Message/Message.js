import './Message.scss';

let classNames = 'message';
const Message = ({
    sender,
    message,
    id
}) => {

    sender === id ? classNames += ' sending' : classNames = 'message';
    
    return (
        <div className={classNames} >
            <p>{message}</p>
        </div>
    )
}

export default Message;