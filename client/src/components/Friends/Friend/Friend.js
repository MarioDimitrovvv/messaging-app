const Friend = ({
    name,
    userId,
}) => {

    // const [isFriend, setIsFriend] = useState(false);

    // const { user } = useContext(UserContext);
    // const { id } = useContext(IdContext);

    // const handleFriendButton = () => {
    //     if (!isFriend) {
    //         console.log(id);
    //         console.log(userId);
    //         addFriend(id, userId);
    //     }

    //     setIsFriend((prevIsFriend) => !prevIsFriend);
    // }

    return (
        <div className="user-container">
            <div>Name: {name}</div>
        </div>
    )
}

export default Friend;