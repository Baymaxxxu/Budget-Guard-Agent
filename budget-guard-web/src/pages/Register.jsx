import {useState} from 'react'
import api from '../services/api'
import {useNavigate} from 'react-router-dom'

export default function Register(){


const nav=useNavigate()


const [form,setForm]=useState({

name:'',
email:'',
password:'',
password_confirmation:''

})



const submit=async(e)=>{


e.preventDefault()


try{


await api.post(

'/register',
form

)


nav('/')

}


catch(err){

console.log(err.response)

}


}



return(

<div className="min-h-screen flex justify-center items-center bg-slate-100">

<form

onSubmit={submit}

className="bg-white shadow-xl rounded-xl p-8 w-96"

>


<h1 className="text-3xl font-bold mb-6">

Register

</h1>



<input

placeholder="Nama"

className="border p-3 w-full rounded mb-3"

onChange={(e)=>setForm({

...form,

name:e.target.value

})}

/>



<input

placeholder="Email"

className="border p-3 w-full rounded mb-3"

onChange={(e)=>setForm({

...form,

email:e.target.value

})}

/>



<input

type="password"

placeholder="Password"

className="border p-3 w-full rounded mb-3"

onChange={(e)=>setForm({

...form,

password:e.target.value

})}

/>



<input

type="password"

placeholder="Konfirmasi Password"

className="border p-3 w-full rounded mb-5"

onChange={(e)=>setForm({

...form,

password_confirmation:e.target.value

})}

/>


<button

className="bg-green-600 text-white p-3 rounded w-full"

>

Register

</button>


</form>

</div>

)

}