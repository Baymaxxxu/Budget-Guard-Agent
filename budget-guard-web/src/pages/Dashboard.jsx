import {useEffect,useState} from 'react'

import Sidebar from '../components/layout/Sidebar'
import Navbar from '../components/layout/Navbar'

import SummaryCard from '../components/cards/SummaryCard'

import CategoryChart from '../components/charts/CategoryChart'
import ExpenseChart from '../components/charts/ExpenseChart'

import api from '../services/api'


export default function Dashboard(){


const [dashboard,setDashboard]=useState(null)

const [loading,setLoading]=useState(true)



useEffect(()=>{

loadDashboard()

},[])



const loadDashboard=async()=>{


try{


const res=await api.get(

'/dashboard'

)


console.log(res.data)



setDashboard(

res.data

)



}


catch(err){


console.log(err)


}


finally{


setLoading(false)


}


}




if(loading){

return(

<div>

Loading...

</div>

)

}




return(


<div className="flex min-h-screen bg-slate-100">


<Sidebar/>


<div className="flex-1">


<Navbar/>


<div className="p-8">



<div className="grid md:grid-cols-4 gap-6">


<SummaryCard

title="Saldo"

value={dashboard.balance}

color="border-green-500"

/>



<SummaryCard

title="Income"

value={dashboard.income}

color="border-blue-500"

/>



<SummaryCard

title="Expense"

value={dashboard.expense}

color="border-red-500"

/>



<SummaryCard

title="Budget"

value={dashboard.budget}

color="border-purple-500"

/>


</div>





<div className="grid md:grid-cols-2 gap-8 mt-8">


<CategoryChart

categories={

dashboard.categories || {}

}

/>




<ExpenseChart

expenses={

dashboard.monthly_expenses || {}

}

/>



</div>



</div>



</div>



</div>


)



}