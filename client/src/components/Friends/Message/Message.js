import './Message.scss';

let classNames = 'message'
const Message = ({
    sender,
    message,
    id
}) => {


    
    if(sender === id) {
        classNames += ' sending'
    } else {
        classNames = 'message'
    }
    
    return (
        <div className={classNames} >
            <p>{message}</p>
        </div>
    )
}

export default Message;