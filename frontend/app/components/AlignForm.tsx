import {Form, useNavigate} from "react-router";
import {type FormEvent, useState} from "react";
import {terminal} from "virtual:terminal";
import api from "~/api";
import {ACCESS_TOKEN} from "~/constants";


export default function AlignForm(){
    const [sequences, setSequences] = useState<string>("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        setLoading(true);
        e.preventDefault();

        try{
            const result = await api.post("/api/jobs/", { name, unaligned: sequences }, {headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
                }})
            if(result.status === 201){
                alert("Successfully created a new alignment!");
            }
            navigate("/account")
        } catch(error){
            alert(error);
        } finally{
            setLoading(false);
        }
    }


    return(
        <div>
            <Form onSubmit={handleSubmit}>
                <label className="text-black text-center text-[2em]">Insert FASTA format unaligned sequences</label>
                <textarea className="w-8/10 h-[35em] p-2.5 m-2.5 border-solid border-1 border-black rounded-sm box-border text-black"
                    value={sequences}
                    onChange={(e) => setSequences(e.target.value)}
                    placeholder="sequences"
                />
                <input className="w-8/10 p-2.5 m-2.5 border-solid border-1 border-black rounded-sm box-border text-black"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Job name"/>
                <button className="w-19/20 p-2.5 m-5 bg-green-300 text-black border-none rounded-sm cursor-pointer transition-colors
                duration-200 hover:bg-red-600 ease-in-out" type="submit">
                    Submit
                </button>
            </Form>
        </div>
    )
}