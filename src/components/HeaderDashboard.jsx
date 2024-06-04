import { IoPersonOutline } from "react-icons/io5";
import { Statistic } from "./Statistic";

export default function HeaderDashboard() {
   const username = localStorage.getItem("username") || "Guest";
   return (
      <div className="w-full p-8 md:p-20 grid grid-cols-1 gap-3">
         <div className="text-content text-text mb-10">
            <h2 className="text-xl md:text-6xl  text-start mb-4  ">Dashboard</h2>

            <p className="text-md md:text-2xl text-start mt-2 flex items-center gap-3">
               <div className="rounded-full border-2 border-white flex justify-center items-center w-10 md:w-12 h-10 md:h-12 p-1 md:p-2">
                  <IoPersonOutline className="text-xl md:text-3xl" />
               </div>
               {username}
            </p>
         </div>

         <div className="statistic-content h-full p-3 rounded-md border-2 flex justify-center items-center border-white">
            <Statistic />
         </div>
      </div>
   );
}
