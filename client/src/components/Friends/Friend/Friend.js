import './Friend.scss';

let classNames = 'friend-container'
const Friend = ({
    name,
    userId,
    onClick,
    lastClicked
}) => {
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