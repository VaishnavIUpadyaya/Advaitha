"use client";
import {useState} from "react";

export default function RoutinePage() {
    const [routine, setRoutine] = useState("");
    const generateRoutine=async()=>{
        const res=await fetch("/api/assistant",{
            method: "POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({query:"Generate a skincare routine for me"}),
        });
        const data=await res.json();
        setRoutine(data.reply);
    };

    return (
        <div className="p-8">
      <h1 className="text-xl font-bold">Your Routine</h1>
      <button
        onClick={generateRoutine}
        className="bg-black text-white px-4 py-2 mt-4"
      >
        Generate Routine
      </button>

      {routine && <pre className="mt-4">{routine}</pre>}
    </div>
    );
}