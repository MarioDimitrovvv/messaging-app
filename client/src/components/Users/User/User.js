import './User.scss';

const User = ({
    name,
    email
}) => {
    return (
        <div className="user-container">
            <div>Name: {name}</div>
            <div>Email: {email}</div>
        </div>
    )
}

export default User;