import './Friend.scss';

let classNames = 'friend-container'
const Friend = ({
    name,
    userId,
    onClick,
    lastClicked
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
    if(lastClicked === userId) {
        classNames += ' last-clicked'
    } else {
        classNames = 'friend-container'
    }
    
    return (
        <div className={classNames} onClick={() => onClick(userId)} >
            <div>Name: {name}</div>
        </div>
    )
}

export default Friend;