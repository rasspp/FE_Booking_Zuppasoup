/* eslint-disable react/prop-types */
import { useCallback, useEffect, useRef, useState } from "react";
import { LuFileEdit } from "react-icons/lu";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { PiBowlFood } from "react-icons/pi";
import { MdOutlineAttachMoney } from "react-icons/md";
import { GoHistory } from "react-icons/go";
import axios from "axios";

export default function ModalEvent({ eventInfo, isModalOpen, setIsModalOpen }) {
   const modalRef = useRef();
   const eventId = eventInfo.event._def.extendedProps._id;
   const [dataEvent, setDataEvent] = useState("");
   const navigate = useNavigate();
   const isLoggedIn = !!localStorage.getItem("token");

   const getEventById = useCallback(async () => {
      try {
         const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/event/${eventId}`);
         setDataEvent(response.data);
      } catch (error) {
         console.error("Error fetching event data:", error);
      }
   }, [eventId]);

   useEffect(() => {
      if (isModalOpen && eventInfo && !dataEvent) {
         getEventById();
      }
   }, [isModalOpen, eventInfo, dataEvent, getEventById]);

   const handleCloseModal = useCallback(() => {
      setIsModalOpen(false);
      setDataEvent(null);
   }, [setIsModalOpen]);

   const getFormattedDate = (dateString) => {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
   };

   const getFormattedTimeRange = (startString, endString) => {
      const startTime = new Date(startString);
      const endTime = new Date(endString);

      const startHours = startTime.getHours().toString().padStart(2, "0");
      const startMinutes = startTime.getMinutes().toString().padStart(2, "0");

      const endHours = endTime.getHours().toString().padStart(2, "0");
      const endMinutes = endTime.getMinutes().toString().padStart(2, "0");

      const timeRange = `${startHours}:${startMinutes} - ${endHours}:${endMinutes} WIB`;

      return `${timeRange}`;
   };

   useEffect(() => {
      const handleOutsideClick = (e) => {
         if (modalRef.current && !modalRef.current.contains(e.target)) {
            handleCloseModal();
         }
      };

      if (isModalOpen) {
         document.addEventListener("mousedown", handleOutsideClick);
      }

      return () => {
         document.removeEventListener("mousedown", handleOutsideClick);
      };
   }, [/* eventId, */ isModalOpen, handleCloseModal]);

   // Sensoring Nomor Hp
   // const phoneNumberSensored = isLoggedIn ? (dataEvent.phoneNumber ? dataEvent.phoneNumber.slice(-3) : "") : "";

   const handleEditButtonClick = () => {
      if (eventId) {
         navigate(`/edit-event/${eventId}`);

         window.scrollTo({ top: 20, behavior: "smooth" });
      } else {
         console.error("Event ID tidak tersedia");
      }
   };

   if (!isModalOpen || !eventInfo || !dataEvent) return null;

   return (
      <div className="fixed top-0 left-0 z-50 flex flex-col items-center justify-center w-full h-full bg-black bg-opacity-50 modal-event">
         <div ref={modalRef} className="relative w-full pt-0 overflow-scroll  md:rounded-md md:w-1/2">
            {/* Card */}
            <div className="p-4 text-sm md:p-8 md:pt-4 md:text-md">
               <div className=" bg-white rounded-lg shadow-md overflow-hidden p-4 md:p-6 mb-4">
                  {/* Data Card */}
                  <div className="flex items-center mb-4">
                     <div className="rounded-full bg-gray-200 w-12 h-12 flex items-center justify-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                           />
                        </svg>
                     </div>
                     <div className="ml-4">
                        <p className="text-xl md:text-2xl font-semibold text-gray-900 capitalize">{dataEvent.customerName}</p>
                        <p className="text-sm md:text-md text-gray-500 capitalize">{dataEvent.title}</p>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3 ">
                     <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                           />
                        </svg>
                        <div>
                           <div className="text-gray-500 font-semibold text-sm">Nomor HP</div>
                           <div className="text-gray-500">{isLoggedIn ? dataEvent.phoneNumber : `08******${dataEvent.phoneNumber.toString().slice(-4)}`}</div>
                        </div>
                     </div>
                     <div className="flex items-center">
                        <div className="w-5 h-5  text-gray-500 mr-2">
                           <PiBowlFood className="w-full h-full" />
                        </div>
                        <div>
                           <div className="text-gray-500 font-semibold text-sm">Jumlah Porsi</div>
                           <div className="text-gray-500">{dataEvent.guestCount} Pcs</div>
                        </div>
                     </div>
                     <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                           />
                        </svg>
                        <div>
                           <div className="text-gray-500 font-semibold text-sm">Tanggal</div>
                           <div className="text-gray-500">{getFormattedDate(dataEvent.start)}</div>
                        </div>
                     </div>
                     <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                           <div className="text-gray-500 font-semibold text-sm">Jam</div>
                           <div className="text-gray-500">{getFormattedTimeRange(dataEvent.start, dataEvent.end)}</div>
                        </div>
                     </div>
                     <div className="flex items-center">
                        <div className="w-5 h-5  text-gray-500 mr-2">
                           <MdOutlineAttachMoney className="w-full h-full" />
                        </div>
                        <div>
                           <div className="text-gray-500 font-semibold text-sm">Status</div>
                           <div className="text-gray-500">{dataEvent.status}</div>
                        </div>
                     </div>
                     <div className="flex items-center">
                        <div className="w-5 h-5  text-gray-500 mr-2">
                           <GoHistory className="w-full h-full" />
                        </div>
                        <div>
                           <div className="text-gray-500 font-semibold text-sm">Dokumentasi</div>
                           <div>
                              {" "}
                              {dataEvent.linkDocumentation ? (
                                 <a
                                    href={`${dataEvent.linkDocumentation}`}
                                    className=" text-gray-500 w-fit hover:underline cursor:pointer"
                                    title="Cek di Google Drive"
                                    target="_blank"
                                    rel="noreferrer"
                                 >
                                    Cek Dokumentasi
                                 </a>
                              ) : (
                                 <p className=" text-gray-500 no-underline  cursor-auto w-fit ">Belum Tersedia</p>
                              )}
                           </div>
                        </div>
                     </div>
                     <div className="flex items-center text-gray-500 col-span-2 mb-3">
                        <div className="h-5 w-5 mr-2 text-xl">
                           <FaLocationDot />
                        </div>
                        <div>
                           <div className=" font-semibold text-sm ">Lokasi</div>
                           <div className="w-full text-wrap">
                              {isLoggedIn ? (
                                 dataEvent.location && dataEvent.location.cityName && dataEvent.location.address ? (
                                    <div>{`${dataEvent.location.cityName}, ${dataEvent.location.address}, ${dataEvent.location.postalCode}, ${dataEvent.location.note}`}</div>
                                 ) : (
                                    <div className="capitalize">lokasi belum diisi</div>
                                 )
                              ) : dataEvent.location && dataEvent.location.address ? (
                                 dataEvent.location.address
                              ) : (
                                 <div className="capitalize">lokasi belum diisi</div>
                              )}
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-4">
                     <button
                        onClick={handleEditButtonClick}
                        className={`px-4 py-2 flex justify-between rounded-md text-green-500 border border-green-500 hover:bg-green-100 ${
                           isLoggedIn ? "flex" : "hidden"
                        }`}
                     >
                        <LuFileEdit size={18} className="mr-2" /> Edit
                     </button>
                     <button
                        onClick={handleCloseModal}
                        className="px-4 py-2 flex justify-between items-center rounded-md text-red-500 border border-red-500 hover:bg-red-100"
                     >
                        <ImCross size={15} className="mr-2" /> Close
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
