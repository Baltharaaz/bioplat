import type { Route } from "./+types/report"
import {useContext, useState} from "react";
import { useCallback } from "react";
import Navbar from "~/components/navbar";

export async function clientLoader({ params }: Route.LoaderArgs){
    const jobId = params.jobID
    const res = await fetch('')
    return { jobId }
}

export async function action({ request }: Route.ActionArgs){

}


export default function Report({loaderData, actionData}: Route.ComponentProps)    {
    //const authToken = useCallback(() => useContext(AccountContext), [])

    return(
        <div className="box">
            <div className="flex-nowraps">
                <p className=''>
                    Testing Report Page: jobID = {loaderData.jobId}
                </p>
                <Navbar />
            </div>
            <div className="flex flex-center">
                <img src="" alt='phylo-tree'>
                </img>
                <img alt='msa'>
                </img>
            </div>
        </div>
    )
}
