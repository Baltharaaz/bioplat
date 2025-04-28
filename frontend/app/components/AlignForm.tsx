import {Form} from "react-router";


export default function AlignForm(){
    return(
        <div>
            <Form method="POST" action="/api/jobs/create">
                <h1 className="text-black">Insert FASTA format unaligned sequences</h1>
                <input>

                </input>
                <button type="submit">
                    Submit
                </button>
            </Form>
        </div>
    )
}