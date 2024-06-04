import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ValidationEventData } from "./../utils/ValidationEventData";
import { GiCheckMark } from "react-icons/gi";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoReturnDownBack } from "react-icons/io5";
import { EventFormInput } from "../components/EventFormInput";
import { OptionalInputsData } from "../components/OptionalInputsData";

const AddEvent = () => {
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
   const [accessKey, setAccessKey] = useState("");

   const [errors, setErrors] = useState({
      eventName: "",
      customerName: "",
      phoneNumber: "",
      guestCount: "",
      startDate: "",
      startTime: "",
      endTime: "",
      testimonial: "",
   });

   const [successAddEvent, setSuccessAddEvent] = useState(false);

   const navigate = useNavigate();

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
         case "accessKey":
            setAccessKey(value);
            break;
         default:
            break;
      }
   };

   // Validasi Real Time
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
            accessKey,
            testimonial,
         },
         "add"
      );

      setErrors(validationErrors);
   }, [eventName, customerName, phoneNumber, guestCount, startDate, startTime, endTime, accessKey, testimonial]);

   const handleAddEvent = async (e) => {
      e.preventDefault();

      const validationErrors = ValidationEventData(
         {
            eventName,
            customerName,
            phoneNumber,
            guestCount,
            startDate,
            startTime,
            endTime,
            accessKey,
            testimonial,
         },
         "add"
      );
      if (Object.values(validationErrors).some((error) => error !== "")) {
         setErrors(validationErrors);
         return;
      }

      // Format data acara
      const startDateTime = new Date(`${startDate}T${startTime}`);
      let endDateTime = new Date(`${startDate}T${endTime}`);

      // Periksa apakah jam selesai lebih awal dari jam mulai
      if (endDateTime < startDateTime) {
         // Jika ya, tambahkan 1 hari ke tanggal jam selesai
         endDateTime = new Date(endDateTime.getTime() + 86400000); // 86400000 milidetik = 1 hari
      }

      const location = {
         cityName,
         address,
         postalCode,
         note,
      };

      try {
         const maxOrdersPerDay = 3;
         const existingEventsForDay = [];

         if (existingEventsForDay.length >= maxOrdersPerDay) {
            alert("Maaf, maksimal 3 orderan dalam 1 hari. Mohon cek kalendar terlebih dahulu sebelum booking.");
            console.log("Maaf, maksimal 3 orderan dalam 1 hari. Mohon cek kalendar terlebih dahulu sebelum booking.");
            return;
         }

         const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/event`, {
            title: eventName,
            customerName,
            phoneNumber,
            guestCount,
            start: startDateTime.toISOString(),
            end: endDateTime.toISOString(),
            status,
            location,
            linkDocumentation,
            testimonial,
         });

         console.log(response.status);

         setEventName("");
         setCustomerName("");
         setPhoneNumber("");
         setGuestCount("");
         setStartDate("");
         setStartTime("");
         setEndTime("");
         setStatus("DP");
         setTestimonial("");

         setSuccessAddEvent(true);
         setTimeout(() => {
            setSuccessAddEvent(false);
            navigate("/");
         }, 2000);
      } catch (error) {
         console.error("Error saat menambah data:", error);
         alert("Terjadi kesalahan saat menambahkan acara");
      }
   };

   return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center mb-20 pt-32">
         <form onSubmit={handleAddEvent} className="bg-transparent text-text md:p-8 rounded shadow-md w-full md:max-w-5xl">
            <h1 className="text-xl sm:text-2xl mt-5 md:mt-0 md:text-4xl font-bold text-center mb-4">Pre Order ZUPPASOUP</h1>
            <hr />
            <br />
            <div className="text-sm text-start md:text-center my-2  flex justify-center leading-4">
               <p className="w-full bg-transparent rounded-md p-2 border-2 border-orange-500 md:text-md ">
                  Hanya diperbolehkan melakukan maksimal 3 booking dalam satu hari. Sebelum melakukan pemesanan, pastikan untuk memeriksa tanggal yang ingin
                  dibooking terlebih dahulu.
               </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-0 pt-6 md:pt-0 md:gap-y-4 mb-4 mt-3 md:mt-10">
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

               <EventFormInput label="kunci akses" typeInput="text" nameInput="accessKey" keyData={accessKey} handleChange={handleChange} errors={errors} />
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

            <div className="w-full flex items-center justify-center ">
               <button
                  type="submit"
                  className="primary-button  w-full md:w-5/12 scale-90 md:scale-100 md:mt-5 text-xl flex items-center justify-center gap-3 border-green-500 text-green-500"
               >
                  <GiCheckMark /> Konfirmasi
               </button>
            </div>

            <div className="flex justify-center mt-7">
               <Link
                  to={"/"}
                  className="cursor-pointer scale-90 sm:scale-100 p-3 mb-7 md:mb-0 flex items-center gap-2 border-2 border-transparent hover:border-white rounded-lg"
               >
                  <IoReturnDownBack className="text-xl" /> Kembali Ke Halaman Utama
               </Link>
            </div>
         </form>

         {successAddEvent && (
            <div className="fixed z-30 top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 transition-all">
               <div className="bg-orange-500 border-2 border-white rounded-md shadow-lg text-center p-10">
                  <p className="w-full text-center p-7">
                     <FaRegCheckCircle className="w-full text-green-400 text-7xl" />
                  </p>
                  <p className="text-3xl text-white font-semibold ">Yeay! Data Anda berhasil terkirim</p>
                  <p className="text-md text-white">Terima kasih telah melakukan pemesanan. Kami akan memprosesnya. Tolong tunggu beberapa saat...</p>
               </div>
            </div>
         )}
      </div>
   );
};

export default AddEvent;
