import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MyCalendar from "../components/MyCalendar";
import { fetchEvents } from "../services/EventService";
import HeroSlider from "../components/HeroSlider";
import Testimonials from "../components/Testimonials";

const Home = () => {
   const navigate = useNavigate();

   // const username = localStorage.getItem("username") || "Guest";

   const [events, setEvents] = useState([]);
   const [filterStatus, setFilterStatus] = useState("All");

   useEffect(() => {
      const handleFetchedEvents = async () => {
         const fetchedEvents = await fetchEvents();
         setEvents(fetchedEvents);
      };

      handleFetchedEvents();
   }, []);

   const handleStatusFilter = (status) => {
      setFilterStatus(status);
   };

   const filteredEvents = filterStatus === "All" ? events : events.filter((event) => event.status === filterStatus);

   return (
      <>
         <div className="bg-gray-900 flex flex-col items-center justify-center min-h-screen mb-20 ">
            <HeroSlider />

            <section className="bg-transparent text-text p-3 md:p-8 w-full  rounded-lg rounded-tl-none">
               <p className="text-sm leading-4 md:leading-5 text-start md:text-sm  md:text-center my-2 rounded-lg p-4 border-2 border-orange-500 mt-10">
                  &quot;Perhatian, Kamu dapat memesan acara dengan mengklik tombol &quot;Pre Order Zuppasoup&quot; di bawah kalendar. Pastikan dikalendar bahwa
                  tanggal yang Anda pilih belum mencapai 3 acara atau lebih, karena maksimal hanya 3 acara dalam 1 hari.&quot;
               </p>
               <br />

               <div id="calendar" className="p-3 bg-white/20 backdrop:blur rounded text-white md:p-16 border-2 border-white">
                  <div className="mt-4 mb-8 text-sm filter md:text-md">
                     <label className="mr-4 text-sm md:text-xl">Filter Status:</label>
                     <select
                        value={filterStatus}
                        onChange={(e) => handleStatusFilter(e.target.value)}
                        className="px-3 py-2 bg-white text-sm border rounded-md text-gray-900 md:text-[0.9rem]"
                     >
                        <option value="All">Semua</option>
                        <option value="DP">DP</option>
                        <option value="Lunas">Lunas</option>
                        <option value="Pending">Pending</option>
                     </select>
                  </div>

                  <MyCalendar events={filteredEvents} />
               </div>

               <div className="w-full flex justify-center">
                  <button
                     className="w-full md:w-4/12  px-4 py-2 text-sm  text-white transition-all duration-300 border border-white rounded-lg md:text-xl md:text-md mt-7 primary-button font-semibold"
                     onClick={() => navigate("/add-event")}
                  >
                     + Pre Order Zuppasoup
                  </button>
               </div>

               {/* <Documentation /> */}
               <div className="flex justify-center w-full mt-10 text-center md:text-sm text-orange-50">
                  <div className="w-full text-sm leading-4 md:leading-5 text-start md:text-sm  md:text-center my-2 rounded-lg p-4 border-2 border-orange-500 mt-10 ">
                     <p>Terima kasih telah mempercayai dan memesan produk ZUPPASOUP, senang dapat berpatisipasi dengan acara Kamu.</p>
                     <p>ZUPPASOUP, selalu siap memberikan rasa dan pengalaman yang berkesan!!.</p>
                  </div>
               </div>
            </section>
         </div>

         <Testimonials />
      </>
   );
};

export default Home;
