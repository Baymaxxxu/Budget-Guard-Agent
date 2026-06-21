import { FaArrowTrendUp } from "react-icons/fa6";

export default function SummaryCard({

    title,
    value,
    icon,
    gradient

}) {


    return (

        <div className={`

            ${gradient}

            rounded-3xl
            p-6
            text-white
            shadow-lg

            hover:scale-105
            duration-300

        `}>


            <div className="flex justify-between items-center">


                <div>

                    <p className="opacity-80">

                        {title}

                    </p>


                    <h1 className="text-3xl font-bold mt-2">

                        {value}

                    </h1>


                </div>



                <div className="text-4xl">


                    {icon}


                </div>


            </div>



            <div className="flex gap-2 mt-5">


                <FaArrowTrendUp />


                <span>

                    +12% Bulan Ini

                </span>


            </div>



        </div>

    )

}