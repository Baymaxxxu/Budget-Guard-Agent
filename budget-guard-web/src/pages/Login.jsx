import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function Login(){

const nav = useNavigate()

const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
const [error,setError] = useState('')


const submit = async(e)=>{

e.preventDefault()

setError('')

try{

const res = await api.post('/login',{

email,
password

})

localStorage.setItem(

'token',
res.data.token

)

localStorage.setItem(

'user',
JSON.stringify(res.data.user)

)


nav('/dashboard')


}

catch(err){

setError(

err.response?.data?.message ||

'Login gagal'

)

}

}



return(

<div className="min-h-screen bg-slate-100 flex justify-center items-center">

<form

onSubmit={submit}

className="bg-white shadow-lg rounded-xl p-8 w-96"

>

<h1 className="text-3xl font-bold mb-6">

Budget Guard

</h1>


{

error &&

<p className="text-red-500 mb-3">

{error}

</p>

}



<input

className="border p-3 w-full rounded mb-3"

placeholder="Email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

/>



<input

type="password"

className="border p-3 w-full rounded mb-5"

placeholder="Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>



<button

className="bg-blue-600 text-white p-3 rounded w-full"

>

Login

</button>



</form>


</div>

)


}