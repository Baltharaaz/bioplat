import {NavLink, Link, Outlet} from "react-router";
import {useContext} from "react";
import {useAuth} from "~/auth/auth";
import hamburgericon from "./Hamburger_icon.svg"

function loggedIn() {

}

function loggedOut() {

}


export default function Navbar() {
    const { token } = useAuth()

    return(
        <>
            <div className="flex flex-nowrap justify-between bg-green-300 border-b-black border-b-2">
                <nav role="navigation" className="p-1 pl-3">
                    <ul>
                        <li>
                            <img src={hamburgericon} alt="main-nav"></img>
                        </li>
                    </ul>
                </nav>
                <nav role="navigation">
                    <ul className="flex justify-between gap-20 last:mr-2 font-semibold text-black pt-2">
                        {token && (
                        <li className="m-auto">
                            <Link to="/" type="entry">
                                Log Out
                            </Link>
                        </li>)}
                        {!token && (
                        <li>
                            <Link to="/">
                                Log In
                            </Link>
                        </li>)}
                        <li>
                            <Link to="/about">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact">
                                My Account
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <Outlet/>
        </>
    )

}