import api from "~/api";
import type { Route } from './+types/account'
import {ProtectedRoute} from "~/routes/ProtectedRoute";
import {ACCESS_TOKEN} from "~/constants";
import {terminal} from "virtual:terminal";
import AlignForm from "~/components/AlignForm";
import Job from "~/components/Job";
import {useEffect, useState} from "react";
import {Outlet} from "react-router";


export async function clientLoader(){
    const jobs = await api.get("/api/jobs/", {headers: {
        Authorization : 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }}).then((response) => response.data)
    terminal.log(jobs)
    return jobs
}


export default function Account({loaderData} : Route.ComponentProps){
    const jobs = loaderData;
    return(
        <ProtectedRoute>
            <main className="flex flex-row">
            <div className="w-5/10 h-[50em] flex-auto border-2 rounded-lg border-black">
                <ul className="text-black w-10/10">
                    {jobs && jobs.map((job : JSON) =>
                        <li key={job.id}>
                            {job.name}
                            <Job job={job} key={job.id}/>
                        </li>)}
                </ul>
            </div>
            <div className="w-5/10 h-[50em] flex border-2 rounded-lg border-black">
                <AlignForm/>
                <Outlet/>
            </div>
            </main>
        </ProtectedRoute>
    )
}
