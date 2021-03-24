const Message = ({
    message,
    user,
}) => {
    return (
        <div>
            {user}: {message}
        </div>
    )
}

export default Message;