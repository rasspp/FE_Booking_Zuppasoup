import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MyCalendar from "../components/MyCalendar";
import axios from "axios";
import HeaderDashboard from "../components/HeaderDashboard";
// import Documentation from "../components/Documentation";

const Dashboard = () => {
   const navigate = useNavigate();

   const [events, setEvents] = useState([]);
   const [filterStatus, setFilterStatus] = useState("All");

   useEffect(() => {
      const fetchEvents = async () => {
         try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/event`);

            const fetchedEvents = response.data;

            setEvents(fetchedEvents);
         } catch (error) {
            console.error("Error fetching events:", error);
         }
      };

      fetchEvents();
   }, []);

   const handleStatusFilter = (status) => {
      setFilterStatus(status);
   };

   const filteredEvents = filterStatus === "All" ? events : events.filter((event) => event.status === filterStatus);

   return (
      <div className="min-h-screen  bg-gray-900 flex items-center justify-center flex-col mb-20 pt-32 pb-20">
         <HeaderDashboard />

         <section className="bg-transparent text-text p-8 rounded-lg  w-full ">
            <div id="calendar" className="bg-white/20 text-white p-3 md:p-16  rounded border-2 border-white ">
               <div className="filter mt-4 mb-8 text-sm md:text-md">
                  <label className="mr-4 text-sm md:text-xl">Filter Status:</label>
                  <select
                     value={filterStatus}
                     onChange={(e) => handleStatusFilter(e.target.value)}
                     className="border rounded-md py-2 px-3 bg-white text-gray-900 text-sm md:text-[0.9rem]"
                  >
                     <option value="All">Semua</option>
                     <option value="DP">DP</option>
                     <option value="Lunas">Lunas</option>
                     <option value="Pending">Pending</option>
                  </select>
               </div>

               <MyCalendar events={filteredEvents} />
            </div>

            <div className="flex justify-center md:mt-5">
               <button
                  className="primary-button text-sm md:text-md mt-5 px-2 md:px-4 w-fit md:text-xl bg-blue border border-white active:bg-white/20 active:backdrop:blur text-white font-bold py-2  rounded transition-all duration-300"
                  onClick={() => navigate("/add-event")}
               >
                  + Pre Order Zuppasoup
               </button>
            </div>

            {/* <Documentation /> */}
         </section>
      </div>
   );
};

export default Dashboard;
