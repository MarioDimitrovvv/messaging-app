import { useAlert } from "../context/AlertContext";

const SetNotification = (message) => {
    const {setAlert} = useAlert()
    setAlert = message;
    setInterval(() => {
        setAlert = null;
    }, 2000)
}

export default SetNotification;