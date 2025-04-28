import Form from "~/components/Form"


export default function Register(){
    localStorage.clear()
    window.dispatchEvent(new CustomEvent("register"))
    return(
        <Form route="/api/user/register" method="register" />
    )
}