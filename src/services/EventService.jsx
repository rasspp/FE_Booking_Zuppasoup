import axios from "axios";

export const fetchEvents = async () => {
   try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/event`);
      const fetchedEvents = response.data;
      return fetchedEvents;
   } catch (error) {
      console.error("Error fetching events:", error);
   }
};

export const deleteEvent = async (eventId, events) => {
   const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus event ini?");
   if (!confirmDelete) return events;

   try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/event/${eventId}`);
      const updatedEvents = events.filter((event) => event._id !== eventId);
      return updatedEvents;
   } catch (error) {
      console.error("Error deleting event:", error);
      return events;
   }
};
