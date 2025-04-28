import {useState} from "react";
import api from "../api"
import {redirect, useNavigate} from "react-router";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "~/constants";
import { terminal } from "virtual:terminal"



export default function Form({ route, method }: {route: string; method: string }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e: any) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password })
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")
            } else {
                navigate("/login")
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center m-auto p-5 rounded-lg box">
            <h1>{name}</h1>
            <input
                className="w-9/10 p-2.5 m-2.5 border-solid border-1 border-black rounded-sm box-border text-black"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            {name === "Register" && (<input
                className="w-9/10 p-2.5 m-2.5 border-solid border-1 border-black rounded-sm box-border text-black"
                type="text"
                value={email}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Email"
            />)}
            <input
                className="w-9/10 p-2.5 m-2.5 border-solid border-1 border-black rounded-sm box-border text-black"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            {loading}
            <button className="w-19/20 p-2.5 m-5 bg-green-300 text-black border-none rounded-sm cursor-pointer transition-colors
            duration-200 ease-in-out" type="submit">
                {name}
            </button>
        </form>
    );
}
