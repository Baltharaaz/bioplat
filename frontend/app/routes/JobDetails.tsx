import {ProtectedRoute} from "~/routes/ProtectedRoute";
import type {Route} from "./+types/jobdetails"
import api from "~/api";
import {ACCESS_TOKEN} from "~/constants";
import {terminal} from "virtual:terminal";


export async function clientLoader( {params} : Route.ClientLoaderArgs){
    const job = api.get(`api/jobs/${params.jobId}`, {headers: {
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }
    });
    terminal.log(job)
    return job
}


export default function JobDetails({ loaderData } : Route.ComponentProps ){
    const job = loaderData;

    return (
        <ProtectedRoute>
            {job && (<div className="flex flex-col justify-between" typeof="job container">
                <p className="text-black text-[0.5vh]">{job.unaligned}</p>
                <p className="flex-auto text-black text-[0.5vh] bg-white">{job.aligned}</p>
            </div>)}
        </ProtectedRoute>
    )
}