



export default function Job({job} : { job: any }) {
    const formattedDate = new Date(job.created_at).toLocaleDateString("en-US")

    return(
        <div className="flex flex-col justify-between" typeof="job container">
            <h1>Should be rendering</h1>
            <img src={job.phylo} alt="job-phylo"></img>
            <p className="flex-auto text-black text-[2.5vh]">{job.name}</p>
            <p className="flex-auto text-black text-[2.5vh]">{job.unaligned}</p>
            <p className="flex-auto text-black text-[2.5vh]">{job.aligned}</p>
            <button>
                Delete
            </button>
        </div>
    )


}