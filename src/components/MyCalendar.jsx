/* eslint-disable react/prop-types */
import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import idLocale from "@fullcalendar/core/locales/id";
import listPlugin from "@fullcalendar/list";
import ModalEvent from "./ModalEvent";

const MyCalendar = ({ events }) => {
   const [calendarView, setCalendarView] = useState("dayGridMonth");
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedEvent, setSelectedEvent] = useState(null);
   const [selectedEventInfo, setSelectedEventInfo] = useState(null);

   const handleEventClick = (eventInfo) => {
      if (eventInfo.event) {
         setSelectedEvent(eventInfo.event);
         setSelectedEventInfo(eventInfo);
         setIsModalOpen(true);

         console.log(eventInfo.event._def.extendedProps.status);
      } else {
         console.error("Objek event, waktu mulai, atau waktu selesai adalah null atau tidak terdefinisi.");
         console.log(events[0]?.customerName, events[0]?.end);
         console.log(eventInfo);
      }
   };

   const handleViewChange = (viewInfo) => {
      setCalendarView(viewInfo.view.type);
   };

   const getEventColor = (status) => {
      switch (status) {
         case "DP":
            return "orange";
         case "Pending":
            return "#ff0000"; // Merah
         case "Lunas":
            return "#00ff00"; // Hijau
         default:
            return "#0000ff"; // Default warna biru
      }
   };
   const renderEventContent = (eventInfo) => {
      const { event } = eventInfo;
      const getEvent = eventInfo.event._def.extendedProps.status;
      const color = getEventColor(getEvent);

      return (
         <div className="flex items-center border-2 " style={{ color, border: `2px solid ${color}` }}>
            <div className="w-5 h-full ml-1 ">
               <div className="fc-event-dot w-3 h-3 mr-2 rounded-full" style={{ backgroundColor: color }}></div>
            </div>
            <p className=" line-clamp-2 text-wrap leading-[14px] px-1 py-[4px] capitalize" style={{ color: getEvent === "Pending" ? "salmon" : color }}>
               {event.title}
            </p>
         </div>
      );
   };

   return (
      <div className="mt-10">
         <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
            initialView={calendarView}
            events={events}
            eventClick={handleEventClick}
            headerToolbar={{
               start: "today prev,next",
               center: "title",
               end: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
            }}
            viewDidMount={handleViewChange}
            locale="id"
            locales={[idLocale]}
            eventContent={renderEventContent}
         />

         {isModalOpen && <ModalEvent selectedEvent={selectedEvent} eventInfo={selectedEventInfo} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />}
      </div>
   );
};

export default MyCalendar;
