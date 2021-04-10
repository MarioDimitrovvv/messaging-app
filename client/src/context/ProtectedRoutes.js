import { Redirect, Route } from "react-router";
import { useUser } from "./UserContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { user } = useUser();
    return (
        <Route {...rest} render={(props) => (
            user
                ? <Component {...props} />
                : <Redirect to='/auth' />
        )} />
    )
}

export default ProtectedRoute;