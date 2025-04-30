import {Link, redirect} from "react-router";


export default function Job({job, onShow, onDelete} : { job: any, onDelete : Function }) {
    const formattedDate = new Date(job.created_at).toLocaleDateString("en-US")

    return(
        <div className="flex flex-col justify-between" typeof="job container">
            <img src={job.phylo} alt="job-phylo"></img>
            <p className="flex-auto text-black text-[2.5vh] bg-white">Job name: {job.name}</p>
            <div className="flex flex-col justify-between" typeof="job container">
                <h1>Unaligned:
                    <p className="text-black text-[0.5vh] bg-white">{job.unaligned}</p>
                </h1>
                <h1>
                    Aligned:
                    <p className="flex-auto text-black text-[0.5vh] bg-white">{job.aligned}</p>
                </h1>

            </div>
            <form onSubmit={() => onShow(job.id)}>
                <button className="bg-green-300 border-1  pointer-events-auto" type="submit">
                    Show
                </button>
            </form>
            <form onSubmit={() => onDelete(job.id)}>
                <button className="bg-green-300 border-1  pointer-events-auto" type="submit">
                    Delete
                </button>
            </form>
        </div>
    )


}