import Form from "~/components/Form"


export function Register(){
    localStorage.clear()
    return(
        <>
            <Form route="/api/user/register/" method="register" />
        </>
    )
}