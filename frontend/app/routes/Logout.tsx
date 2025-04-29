import {Navigate, redirect, useNavigate} from "react-router";
import type { Route } from "./+types/logout"
import {ProtectedRoute} from "~/routes/ProtectedRoute";


export default function Logout(){
    localStorage.clear()
    window.dispatchEvent(new Event('storage'));
    return (
        <ProtectedRoute>
            <Navigate to='/login'></Navigate>
        </ProtectedRoute>

    )
}