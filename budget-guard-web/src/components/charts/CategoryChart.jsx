import Chart from 'react-apexcharts'


export default function CategoryChart({categories}){


const options={

labels:Object.keys(categories)

}


const series=Object.values(categories)



return(


<div className="bg-white rounded-xl shadow p-5">


<h2 className="text-xl font-semibold mb-4">

Kategori Pengeluaran

</h2>



<Chart

options={options}

series={series}

type="pie"

height={350}


/>



</div>


)


}