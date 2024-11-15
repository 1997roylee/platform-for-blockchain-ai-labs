import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";



export default function SearchBar(){


    return <div>
       <div className="flex">
       <Input size='lg' placeholder='start a new chat' />
       <Button size='icon'></Button>
       </div>
    </div>
}