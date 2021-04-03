import Message from '../Message';

const Chat = ({
    isNewConversation,
    messages,
    message,
    id,
    handleChange,
    handleSubmit
}) => {
    return (
        <div className="chat-container">
            {isNewConversation ? <div>Start new conversation</div> : null}
            {messages.map(x => <Message key={x._id} sender={x.sender} message={x.message} id={id} />)}
            <form onSubmit={(e) => handleSubmit(e)}>
                <textarea className="text-container" onChange={handleChange} value={message} placeholder="Aa"></textarea>
                <input type="submit" value="Send" />
            </form>
        </div>
    )
}

export default Chat;

