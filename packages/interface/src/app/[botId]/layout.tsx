import { PropsWithChildren } from "react";


export default function Layout({children}: PropsWithChildren){
    return <div className='mx-auto container max-w-2xl flex-1 flex flex-col'>
        {children}
    </div>
}