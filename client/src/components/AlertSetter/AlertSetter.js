import { Alert } from "react-bootstrap";

const AlertSetter = ({
    variant,
    alert,
}) => {
    return (
        <Alert variant={variant}>{alert}</Alert>
    )
}

export default AlertSetter;