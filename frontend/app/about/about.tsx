import {useCallback, useContext} from "react";
import phylotree from "../components/phylotree.png"
import msa from "../components/msa.png"


export default function About (){

    return(
        <>
        <div className="flex flex-row justify-between items-center w-full flex-wrap bg-blend-color">
            <div className="flex flex-col items-center w-full">
                <h1 className="w-5/10 mt-[5vh] mb-[20vh] text-center text-5xl text-black border-green-500 border-2 rounded-sm">
                    A react router + djangorestframework + biopy application.
                </h1>
            </div>
            <p className="w-10/10 mb-[20vh] text-center text-black text-xl">
                Please note that this fullstack application is a work in progress.
            </p>
            <label className="w-5/10 text-green-400 text-[2em]">
                An example of a multiple sequence alignment result file.
                <img src={msa} alt="msa example" className="h-[40vh] text-black"></img>
            </label>
            <label className="w-5/10 text-green-400 text-[2em]">
                An example of a phylogenetic tree.
                <img src={phylotree} alt="phylotree example" className="mt-[3vh] text-black"></img>
            </label>
        </div>
        </>
    )
}