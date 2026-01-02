'use client'

import { useState } from "react";


type QuoteResponse = {
  quote : string;
  author : string;
};

export default function Home() {
  const [data,setData] = useState<QuoteResponse | null>(null);
  const [loading,setLoading] = useState(false);
  
  async function getQuote(){
    try{
      setLoading(true);
      const res = await fetch("/api/quote");
      
      if(!res.ok){
        throw new Error("Failed to fetch quote");
      }

      const json: QuoteResponse = await res.json();
      setData(json);
    }
    catch(error){
      console.error(error);
    }
    finally{
      setLoading(false);
    }

  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans flex flex-col items-center justify-center gap-8 px-4">
      <h1 className="text-2xl font-light tracking-wide text-neutral-400">
        Daily Motivation
      </h1>
      
      {data && (
        <blockquote className="text-center max-w-2xl border-l-2 border-neutral-700 pl-6 py-4 animate-fadeIn">
          <p className="text-xl font-light leading-relaxed text-neutral-200 mb-4">
            "{data.quote}"
          </p>
          <footer className="text-sm text-neutral-500 font-medium">
            — {data.author}
          </footer>
        </blockquote>
      )}

      <button
        className="px-8 py-3 bg-neutral-900 hover:bg-neutral-800 text-neutral-100 rounded-md border border-neutral-800 hover:border-neutral-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={getQuote}
        disabled={loading}
      >
        {loading ? "Loading..." : "Generate Quote"}
      </button>
    </div>
  );
}