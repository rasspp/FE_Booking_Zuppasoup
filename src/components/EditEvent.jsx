/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ValidationEventData } from "./../utils/ValidationEventData";
import { GiCheckMark } from "react-icons/gi";
import { MdDeleteForever } from "react-icons/md";
import { IoReturnDownBack } from "react-icons/io5";
import { EventFormInput } from "./EventFormInput";
import { OptionalInputsData } from "./OptionalInputsData";

const EditEvent = () => {
   const location = useLocation();
   const eventId = location.pathname.split("/").pop();
   const navigate = useNavigate();
   // state validasi tanggal
   const [daysValidation, setDaysValidation] = useState([]);

   // State untuk menyimpan data event yang diedit
   const [eventName, setEventName] = useState("");
   const [customerName, setCustomerName] = useState("");
   const [phoneNumber, setPhoneNumber] = useState("");
   const [guestCount, setGuestCount] = useState("");
   const [startDate, setStartDate] = useState("");
   const [startTime, setStartTime] = useState("");
   const [endTime, setEndTime] = useState("");
   const [status, setStatus] = useState("DP");
   const [cityName, setCityName] = useState("");
   const [address, setAddress] = useState("");
   const [postalCode, setPostalCode] = useState("");
   const [note, setNote] = useState("");
   const [linkDocumentation, setLinkDocumentation] = useState("");
   const [testimonial, setTestimonial] = useState("");

   // State untuk menyimpan pesan kesalahan validasi
   const [errors, setErrors] = useState({
      eventName: "",
      customerName: "",
      phoneNumber: "",
      guestCount: "",
      startDate: "",
      startTime: "",
      endTime: "",
   });

   const getFormattedDate = (dateString) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
   };

   const getFormattedTime = (timeString) => {
      const time = new Date(timeString);
      const hours = time.getHours().toString().padStart(2, "0");
      const minutes = time.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
   };

   useEffect(() => {
      const getEventById = async () => {
         try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/event/${eventId}`);
            const formattedStartDate = getFormattedDate(response.data.start);
            const formattedStartTime = getFormattedTime(response.data.start);
            const formattedEndTime = getFormattedTime(response.data.end);
            setEventName(response.data.title);
            setCustomerName(response.data.customerName);
            setPhoneNumber(response.data.phoneNumber);
            setGuestCount(response.data.guestCount);
            setStartDate(formattedStartDate);
            setStartTime(formattedStartTime);
            setEndTime(formattedEndTime);
            setStatus(response.data.status);
            setCityName(response.data.location.cityName);
            setAddress(response.data.location.address);
            setPostalCode(response.data.location.postalCode);
            setNote(response.data.location.note);
            setLinkDocumentation(response.data.linkDocumentation);
            setTestimonial(response.data.testimonial);
         } catch (error) {
            console.error("Error saat mencari data:", error);
         }
      };
      getEventById();
   }, [eventId]);

   useEffect(() => {
      const validationErrors = ValidationEventData(
         {
            eventName,
            customerName,
            phoneNumber,
            guestCount,
            startDate,
            startTime,
            endTime,
            testimonial,
         },
         "edit",
         daysValidation
      );

      setErrors(validationErrors);
   }, [eventName, customerName, phoneNumber, guestCount, startDate, startTime, endTime, testimonial, daysValidation]);

   const handleChange = (e) => {
      const { name, value } = e.target;
      switch (name) {
         case "eventName":
            setEventName(value);
            break;
         case "customerName":
            setCustomerName(value);
            break;
         case "phoneNumber":
            setPhoneNumber(value);
            break;
         case "guestCount":
            setGuestCount(value);
            break;
         case "startDate":
            setStartDate(value);
            break;
         case "startTime":
            setStartTime(value);
            break;
         case "endTime":
            setEndTime(value);
            break;
         case "status":
            setStatus(value);
            break;
         case "cityName":
            setCityName(value);
            break;
         case "address":
            setAddress(value);
            break;
         case "postalCode":
            setPostalCode(value);
            break;
         case "note":
            setNote(value);
            break;
         case "linkDocumentation":
            setLinkDocumentation(value);
            break;
         case "testimonial":
            setTestimonial(value);
            break;
         default:
            break;
      }
   };

   useEffect(() => {
      const fetchDays = async () => {
         try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/event`);
            const events = response.data;

            if (events && Array.isArray(events)) {
               // Filter testimonials
               const day = events.map((event) => ({
                  date: getFormattedDate(event.start),
               }));
               setDaysValidation(day);
            } else {
               console.log("Tidak ada data event yang ditemukan dalam respons.");
            }
         } catch (error) {
            console.error("Error dalam mengambil data testimonial:", error);
         }
      };

      fetchDays();
   }, []);

   const handleEditEvent = async (e) => {
      e.preventDefault();

      console.log(startDate);
      const startDateTime = new Date(`${startDate}T${startTime}`).toISOString();
      let endDateTime = new Date(`${startDate}T${endTime}`).toISOString();
      console.log(eventName);
      console.log("response:", eventName, customerName, phoneNumber, guestCount, startDateTime, endDateTime, status, testimonial);

      // Validasi data event sebelum mengirimkan ke server

      const validationErrors = ValidationEventData(
         {
            eventName,
            customerName,
            phoneNumber,
            guestCount,
            startDate,
            startTime,
            endTime,
            testimonial,
         },
         "edit",
         daysValidation
      );
      if (Object.values(validationErrors).some((error) => error !== "")) {
         setErrors(validationErrors);
         return;
      }

      const location = {
         cityName,
         address,
         postalCode,
         note,
      };

      // Lakukan permintaan HTTP untuk mengirimkan data event yang diedit ke server
      try {
         const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/event/${eventId}`, {
            title: eventName,
            customerName,
            phoneNumber,
            guestCount,
            start: startDateTime,
            end: endDateTime,
            status,
            location,
            linkDocumentation,
            testimonial,
         });

         console.log(response.status);

         // Setelah berhasil mengedit, arahkan kembali ke halaman utama
         navigate("/");
      } catch (error) {
         console.error("Error saat mengedit data:", error);
         alert("Terjadi kesalahan saat mengedit acara");
      }
   };

   const handleDeleteEvent = async () => {
      try {
         const confirmation = window.confirm("Anda yakin ingin menghapus acara ini?");
         if (!confirmation) return;

         await axios.delete(`${import.meta.env.VITE_API_URL}/api/event/${eventId}`);

         alert("Acara berhasil dihapus.");

         navigate("/");
      } catch (error) {
         console.error("Error saat menghapus data:", error);
         alert("Terjadi kesalahan saat menghapus acara");
      }
   };

   return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center mb-20 pt-32">
         <form onSubmit={handleEditEvent} className="bg-transparent text-text md:p-8 rounded shadow-md w-full sm:max-w-5xl">
            <h1 className="text-xl sm:text-2xl md:text-4xl  mt-5 md:mt-0 font-bold text-center mb-4">Edit Event</h1>
            <hr />
            <br />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:gap-y-4 mb-4 mt-3 md:mt-10">
               <EventFormInput label="nama acara" typeInput="text" nameInput="eventName" keyData={eventName} handleChange={handleChange} errors={errors} />

               <EventFormInput
                  label="nama pemesan"
                  typeInput="text"
                  nameInput="customerName"
                  keyData={customerName}
                  handleChange={handleChange}
                  errors={errors}
               />

               <EventFormInput label="nomor HP" typeInput="number" nameInput="phoneNumber" keyData={phoneNumber} handleChange={handleChange} errors={errors} />

               <EventFormInput
                  label="qty"
                  typeInput="number"
                  nameInput="guestCount"
                  placeholder="jumlah porsi"
                  keyData={guestCount}
                  handleChange={handleChange}
                  errors={errors}
               />

               <EventFormInput label="jam mulai" typeInput="time" nameInput="startTime" keyData={startTime} handleChange={handleChange} errors={errors} />
               <EventFormInput label="jam selesai" typeInput="time" nameInput="endTime" keyData={endTime} handleChange={handleChange} errors={errors} />
               <EventFormInput label="tanggal" typeInput="date" nameInput="startDate" keyData={startDate} handleChange={handleChange} errors={errors} />

               <div className="w-full h-24 px-2 mb-4 scale-90 md:scale-100">
                  <label className="custom-label w-fit">Status Pembayaran</label>
                  <select className="custom-input" name="status" value={status} onChange={handleChange}>
                     <option value="DP">DP</option>
                     <option value="Pending">Pending</option>
                     <option value="Lunas">Lunas</option>
                  </select>
               </div>
            </div>

            <OptionalInputsData
               cityName={cityName}
               address={address}
               postalCode={postalCode}
               note={note}
               linkDocumentation={linkDocumentation}
               testimonial={testimonial}
               handleChange={handleChange}
               errors={errors}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 scale-[0.8] sm:scale-9 md:scale-100 mt-10 gap-3">
               <button
                  onClick={handleDeleteEvent}
                  type="button"
                  className="primary-button border-red-500 bg-transparent text-red-500 rounded-lg p-2  flex gap-3 justify-center items-center"
               >
                  <MdDeleteForever className="text-xl" />
                  Hapus Acara
               </button>

               <button type="submit" className="primary-button border-green-500 text-green-500 text-xl flex items-center justify-center gap-3">
                  <GiCheckMark /> Simpan Perubahan
               </button>
            </div>

            {/* Tombol untuk kembali ke halaman utama */}
            <div className="flex justify-center mt-7 mb-7 md:mb-0 scale-[0.8] sm:scale-9 md:scale-100">
               <Link to={"/"} className="cursor-pointer p-3 flex items-center gap-2 border-2 border-transparent hover:border-white rounded-lg">
                  <IoReturnDownBack className="text-xl" /> Kembali Ke Halaman Utama
               </Link>
            </div>
         </form>
      </div>
   );
};

export default EditEvent;
