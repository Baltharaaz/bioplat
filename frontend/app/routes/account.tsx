import api from "~/api";
import type { Route } from './+types/account'
import {ProtectedRoute} from "~/routes/ProtectedRoute";
import {ACCESS_TOKEN} from "~/constants";
import {terminal} from "virtual:terminal";
import AlignForm from "~/components/AlignForm";
import Job from "~/components/Job";
import {useEffect, useState} from "react";
import {Outlet} from "react-router";
import JobDetails from "~/routes/JobDetails";


export async function clientLoader(){
    const jobs = await api.get("/api/jobs/", {headers: {
        Authorization : 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }}).then((response) => response.data)
    return jobs
}


export default function Account({loaderData} : Route.ComponentProps){
    const [jobs, setJobs] = useState(loaderData);
    const [show, setShow] = useState(null);

    const getJobs = async ()=> {
        api.get("/api/jobs", {headers: {
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            }
        }).then((response) => response.data)
            .then((data) => {
                setJobs(data)
            }).catch((error) => {alert(error)});

    }

    const deleteJob = (id: any) =>{
        api.delete(`api/jobs/delete/${id}/`, {headers: {
                Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            }
        }).then((response) => {
            if(response.status === 204){
                alert("Job deleted successfully.");
            }else{
                alert("Job delete failed.");
                getJobs();
            }
        }).catch((error) => {alert(error)});

    }
    return(
        <ProtectedRoute>
            <main className="flex flex-row flex-wrap">
            <div className="w-5/10 h-[50em] flex-auto border-2 rounded-lg border-black">
                <ul className="text-black w-10/10">
                    {jobs && jobs.map((job : JSON) => (
                        <Job job={job} onShow={setShow} onDelete={deleteJob} key={job.id}/>
                    ))}
                </ul>
            </div>
            <div className="w-5/10 h-[50em] flex border-2 rounded-lg border-black">
                <AlignForm/>
            </div>
                <div>
                    {show && (<div className="flex flex-col justify-between" typeof="job container">
                        <p className="text-black text-[0.5vh]">{show.unaligned}</p>
                        <p className="flex-auto text-black text-[0.5vh] bg-white">{show.aligned}</p>
                    </div>)}
                </div>
            </main>
        </ProtectedRoute>
    )
}
