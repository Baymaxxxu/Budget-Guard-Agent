import {

FaHome,
FaWallet,
FaMoneyBillWave,
FaTags,
FaBell

}

from 'react-icons/fa'


export default function Sidebar(){



const menus=[


{

title:"Dashboard",
icon:<FaHome/>

},

{

title:"Budget",
icon:<FaWallet/>

},

{

title:"Transactions",
icon:<FaMoneyBillWave/>

},

{

title:"Categories",
icon:<FaTags/>

},

{

title:"Notifications",
icon:<FaBell/>

}



]



return(


<div className="

w-64
min-h-screen

bg-indigo-950

text-white

shadow-xl

">



<div className="p-7">


<h1 className="text-3xl font-bold">


💰 Budget Guard


</h1>


</div>




<div>



{

menus.map((menu,index)=>(


<div

key={index}


className="


flex items-center

gap-4

px-7

py-4


hover:bg-indigo-800

duration-300

cursor-pointer


"


>


{menu.icon}



<span>


{menu.title}


</span>



</div>



))


}




</div>




</div>


)



}