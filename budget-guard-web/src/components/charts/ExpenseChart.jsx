import Chart from 'react-apexcharts'


export default function ExpenseChart({expenses}){


const options={

chart:{
id:'expense'
},


xaxis:{

categories:Object.keys(expenses)

}


}



const series=[

{

name:'Expense',

data:Object.values(expenses)

}

]



return(


<div className="bg-white rounded-xl shadow p-5">


<h2 className="text-xl font-semibold mb-4">

Pengeluaran Bulanan

</h2>



<Chart

options={options}

series={series}

type="bar"

height={350}


/>



</div>


)


}