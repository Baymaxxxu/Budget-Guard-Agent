import {useEffect,useState} from 'react'
import api from '../services/api'


export default function Dashboard(){


const [data,setData]=useState(null)



useEffect(()=>{

loadDashboard()

},[])



const loadDashboard = async()=>{


try{


const res = await api.get(

'/dashboard'

)


setData(

res.data

)


}

catch(err){

console.log(err)

}


}



return(

<div className="p-10">


<h1 className="text-3xl font-bold">

Dashboard

</h1>



<pre>

{JSON.stringify(

data,

null,

2

)}

</pre>



</div>

)


}