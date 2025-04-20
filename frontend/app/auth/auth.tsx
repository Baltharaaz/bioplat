import {createContext, useContext, useState} from "react";

const AuthContext = createContext({
    token: "",
    onLogin: () => {},
    onLogout: () => {}
})

type AuthProviderProps = {
    children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [token, setToken] = useState("");

    const handleLogin = async() => {
        const token = await someAuth();
        setToken(token);
    }

    const handleLogout = () => {
        setToken("");
    }

    const value = {
        token,
        onLogin: handleLogin,
        onLogout: handleLogout,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)