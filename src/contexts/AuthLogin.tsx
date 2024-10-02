import { useState, useContext, createContext, useEffect } from "react";
import { useNavigate, useLocation  } from 'react-router-dom';
import axios from 'axios';

type User = {
    email: string;
}

interface AuthContextData {
    AuthLogin(email: string, password: string): Promise<void>;
    user: User | undefined;
    signedIn: boolean;
    signOut(): void;
}

const AuthContextLogin = createContext<AuthContextData>({} as AuthContextData);

export const AuthContextLoginProvider = ({ children }: { children: React.ReactNode }) => {
    const [signedIn, setSignedIn] = useState(false);
    const [user, setUser] = useState<User>();
    const location = useLocation();
    const currentPath = location.pathname;
    const navigate = useNavigate();


    const AuthLogin = async (email: string, password: string) => {
        try {
            const response = await axios.post("http://localhost:4000/auth/login", {
                email, password
            });

            console.log(response);

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("refreshtoken", response.data.refreshtoken);
                
                const loggedInUser = { email: response.data.email };
                setUser(loggedInUser);
                localStorage.setItem("user", JSON.stringify(loggedInUser));
                setSignedIn(true);
                
                navigate("/users/me");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const signOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshtoken");
        localStorage.removeItem("user");
        setUser(undefined);
        setSignedIn(false);
        navigate("/"); 
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        const refreshtoken = localStorage.getItem("refreshtoken");
        const storedUser = localStorage.getItem("user");

        if (token && refreshtoken && storedUser) {
            if (currentPath == '/')
                alert("Você já está logado!");
            navigate("/users/me")
            setUser(JSON.parse(storedUser)); 
            setSignedIn(true);
        }


    }, []);

    return (
        <AuthContextLogin.Provider
            value={{
                AuthLogin,
                user,
                signedIn,
                signOut,
            }}
        >
            {children}
        </AuthContextLogin.Provider>
    );
};

export const useContextLogin = () => {
    return useContext(AuthContextLogin);
};
