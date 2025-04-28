import {Navigate, redirect, useNavigate} from "react-router";
import type { Route } from "./+types/logout"


export default function Logout(){
    localStorage.clear()
    window.dispatchEvent(new Event('storage'));

    return (
        <Navigate to='/login'></Navigate>
    )
}