import { useEffect } from "react";
import { useAlert } from "../context/AlertContext";

const useError = () => {
    const { alert, setAlert } = useAlert();

    useEffect(() => {
        const timer = window.setTimeout(() => {
            setAlert(null);
        }, 2000)

        return () => clearTimeout(timer);
    }, [alert, setAlert])

    return {...alert};
}

export default useError;