import {useRef, useState} from "react";

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        console.log("Performing login with:", username, password);
    }
    return (
        <div>
            Login
        </div>
    )
}