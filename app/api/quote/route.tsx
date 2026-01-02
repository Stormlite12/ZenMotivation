import { NextResponse } from "next/server";

type Quote = {
  q: string;
  a: string;
};


export async function GET() {
    try{
        const res = await fetch("https://zenquotes.io/api/random",{
            cache: "no-store",
        });

        if(!res.ok){
            throw new Error("Failed to fetch quote");
        }

        const data: Quote[] = await res.json();
        const quote = data[0];

        return NextResponse.json(
            {   quote: quote.q,
                author : quote.a
            },
            {status:200}
        );
    }
    catch(error){
        console.error("ZenQuotes API error:", error);
        return NextResponse.json(
            {message : "Something went wrong"},
            {status : 500}
        );
    }
}