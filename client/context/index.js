import { useState, createContext, useEffect } from "react";
import { useRouter } from 'next/router';
import axios from "axios";

const UserContext = createContext();

const UserProvider = ({ children }) => { // Corrected syntax: children prop should be lowercase
    // state when user log in then we update the state
    const [state, setState] = useState({
        user: {},
        token: "",
    });

    useEffect(() => {
        setState(JSON.parse(window.localStorage.getItem('auth')));
    }, []);

    const router = useRouter();

    // Adding token in the config
    const token = state && state.token ? state.token : "";
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // Adding axios interceptor to handle response errors
    axios.interceptors.response.use(
        function (response) {
            // If everything is fine, return the response
            return response;
        },
        function (error) {
            // Handle errors here
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("Response status:", error.response.status);
                console.log("Response data:", error.response.data);
                console.log("Response headers:", error.response.headers);
                if (error.response.status === 401) {
                    // Handle unauthorized access (e.g., token expired)
                    setState(null);
                    window.localStorage.removeItem("auth");
                    router.push('/login');
                }
            } else if (error.request) {
                // The request was made but no response was received
                console.log("No response received:", error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error:", error.message);
            }
            // Return the error
            return Promise.reject(error);
        }
    );

    return (
        <UserContext.Provider value={[state, setState]}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
