import {FaBell} from 'react-icons/fa'

import {useNavigate} from 'react-router-dom'

import api from '../../services/api'


export default function Navbar(){



const nav=useNavigate()


const user=JSON.parse(

localStorage.getItem('user')

)




const logout=async()=>{


await api.post('/logout')


localStorage.clear()


nav('/')



}




return(


<div


className="


backdrop-blur-lg


bg-white/70


shadow


p-5


flex


justify-between


items-center


"



>



<h2 className="text-2xl font-bold">


Dashboard


</h2>




<div className="flex items-center gap-6">



<div className="relative">


<FaBell size={22}/>


<div className="


absolute


-top-2


-right-2


bg-red-500


text-white


rounded-full


w-5


h-5


text-xs


flex


items-center


justify-center


">


3


</div>



</div>




<div className="flex items-center gap-3">


<img


src="https://i.pravatar.cc/150"


className="


w-10


h-10


rounded-full


"

/>



<span>


{user?.name}


</span>



</div>



<button


onClick={logout}


className="


bg-red-500


text-white


px-4


py-2


rounded-xl


hover:bg-red-600


"


>


Logout


</button>



</div>




</div>



)


}