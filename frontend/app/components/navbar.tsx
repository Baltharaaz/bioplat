import {Form, Link, Outlet, useNavigate} from "react-router";
import {Fragment, useEffect, useState} from "react";
import hamburgericon from "./Hamburger_icon.svg"
import {ACCESS_TOKEN, REFRESH_TOKEN} from "~/constants";
import type {Route} from "./+types/navbar"
import { terminal } from 'virtual:terminal'
import api from "~/api";
import {jwtDecode} from "jwt-decode";

export async function clientLoader(){
    const item = localStorage.getItem(ACCESS_TOKEN);
    return !!item;

}



export default function Navbar({loaderData, actionData} : Route.ComponentProps) {
    const [token, setToken] = useState<boolean | null>(loaderData);
    const navigate = useNavigate();

    const handleSubmit = async (): Promise<void> => {
        localStorage.setItem(ACCESS_TOKEN, "disToken");
        setToken(true);
        window.dispatchEvent(new Event("storage"));
    }

    useEffect(() =>{
        function checkLogIn(){
            const item = localStorage.getItem(ACCESS_TOKEN);
            if(item){
                setToken(true);
            }else{
                setToken(false);
            }
        }
        window.addEventListener('storage', checkLogIn);
        auth().catch(() => setToken(false));

        return () => {
            window.removeEventListener('storage', checkLogIn);
        }
    })
    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken,
            });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setToken(true)
            } else {
                setToken(false)
            }
        } catch (error) {
            console.log(error);
            setToken(false);
        }
    };

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setToken(false);
            return;
        }
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            setToken(true);
        }
    };


    return(
        <>
            <div className="flex flex-nowrap justify-between bg-green-300 border-b-black border-b-2">
                <nav role="navigation" className="p-1 pl-3">
                    <ul>
                        <li>
                            <Link to="/">
                                <img src={hamburgericon} alt="main-nav"></img>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <nav role="navigation">
                    <ul className="flex justify-between gap-20 last:mr-2 font-semibold text-black pt-2">
                        {token && (
                        <li className="m-auto">
                            <Link to="/logout" type="entry" className="hover:text-red-500 transition-colors duration-600">
                                Log Out
                            </Link>
                        </li>)}
                        {!token && (
                        <li>
                            <Link to="/login" className="hover:text-red-500 transition-colors duration-600">
                                Log In
                            </Link>
                        </li>)}
                        <li>
                            <Link to="/about" className="hover:text-red-500 transition-colors duration-600">
                                About
                            </Link>
                        </li>
                        {!token && (<li>
                            <Link to="/register" className="hover:text-red-500 transition-colors duration-600">
                                Register
                            </Link>
                        </li>)
                        }
                        {token && (<li>
                            <Link to="/account" className="hover:text-red-500 transition-colors duration-600">
                                My Account
                            </Link>
                        </li>)}
                    </ul>
                </nav>
                <form onSubmit={handleSubmit}>
                    <button className="text-black" type="submit">
                        Dis da button
                    </button>
                </form>
            </div>
            <Outlet/>
        </>
    )

}