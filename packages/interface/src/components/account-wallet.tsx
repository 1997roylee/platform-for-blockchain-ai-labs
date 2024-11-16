
"use client"

import { useQuery } from "@tanstack/react-query"

export default function AccountBalance(){

    const {isPending, data}  =useQuery({
        queryKey: ["Account"],
        queryFn: async ()=>{
            return await fetch("/api/wallets").then((res)=>res.json())
        }
    })

    console.log(data)
    return <div></div>
}