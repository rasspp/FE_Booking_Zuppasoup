import { useEffect, useState } from "react";
import { LuShieldCheck } from "react-icons/lu";
import { TiInfoOutline } from "react-icons/ti";
import { useLocation, useParams } from "react-router-dom";
import { FaRankingStar } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { GoHistory } from "react-icons/go";

/* eslint-disable react/prop-types */
export const OptionalInputsData = ({ cityName, address, postalCode, note, linkDocumentation, testimonial, handleChange, errors }) => {
   const { id } = useParams();
   const location = useLocation();
   const [showTestimonial, setShowTestimonial] = useState(false);

   useEffect(() => {
      // Show the testimonial field for both /add-event and /edit-event/:id paths
      setShowTestimonial(location.pathname.startsWith("/add-event") || (location.pathname.startsWith("/edit-event/") && id));
   }, [location, id]);

   const SuccessInfo = () => {
      return (
         <div className="flex items-center h-10 gap-2 ml-2 text-green-400">
            <LuShieldCheck className="w-1/12 text-xl h-7" />
            <p className="w-11/12 flex items-center pt-1 text-sm leading-4 ">Tepat Sekali</p>
         </div>
      );
   };
   return (
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 scale-90 md:scale-100 md:grid-cols-2 gap-3 px-2 mb-4 mt-3 md:mt-10">
         <div className="h-full mb-4">
            <label className="custom-label w-full m-0 flex justify-center items-centers gap-2" htmlFor="cityName">
               <FaLocationDot className="text-xl" />
               Lokasi Acara (optional)
            </label>
            <div className="flex flex-col gap-2">
               <input
                  type="text"
                  className="custom-input rounded-t-none"
                  placeholder='Masukkan nama "Kota, Provinsi"'
                  id="cityName"
                  name="cityName"
                  value={cityName}
                  onChange={handleChange}
                  autoComplete="off"
               />
               <textarea
                  type="text"
                  className="custom-input h-36"
                  placeholder='Masukkan "Alamat Lengkap", termasuk "Jalan", "Desa/Daerah", "Kelurahan", "Kecamatan", "RT/RW", dan "Blok Rumah/Blok Kompleks"'
                  name="address"
                  value={address}
                  onChange={handleChange}
                  autoComplete="off"
               />

               <input
                  type="number"
                  className="custom-input"
                  placeholder='Kode Pos "10153"'
                  name="postalCode"
                  value={postalCode}
                  onChange={handleChange}
                  autoComplete="off"
               />
               <textarea
                  type="text"
                  className="custom-input h-20"
                  placeholder='Berikan  petunjuk. Contoh "ada tenda biru" '
                  name="note"
                  value={note}
                  onChange={handleChange}
                  autoComplete="off"
               />
            </div>
         </div>

         <div className="h-full mb-4 flex flex-col gap-6 sm:gap-2">
            <div className="w-full h-fit">
               <label className="custom-label w-full m-0 flex justify-center items-centers gap-2" htmlFor="linkDocumentation">
                  <GoHistory className="text-xl" />
                  Dokumentasi (optional)
               </label>
               <div className="flex gap-2">
                  <input
                     type="text"
                     className="custom-input rounded-t-none"
                     placeholder="https://google.drive.com"
                     id="linkDocumentation"
                     name="linkDocumentation"
                     value={linkDocumentation}
                     onChange={handleChange}
                     autoComplete="off"
                  />
               </div>
            </div>

            {showTestimonial && (
               <div className="w-full">
                  <label className="custom-label w-full m-0 flex justify-center items-centers gap-2" htmlFor="testimonial">
                     <FaRankingStar className="text-xl" />
                     Beri Penilaian (optional)
                  </label>
                  <div className="w-full">
                     <textarea
                        type="text"
                        className="custom-input w-full h-24 rounded-t-none "
                        placeholder="Ceritakan pendapat Anda mengenai produk atau layanan"
                        id="testimonial"
                        name="testimonial"
                        value={testimonial}
                        onChange={handleChange}
                        autoComplete="off"
                     />
                  </div>
                  {errors.testimonial && (
                     <div className="flex items-center h-10 gap-2 ml-2">
                        <TiInfoOutline className="w-1/12 text-xl h-7 text-orange-500" />
                        <p className="w-11/12  text-orange-400 flex items-center pt-1 text-sm leading-4 ">{errors.testimonial}</p>
                     </div>
                  )}
                  {!errors.testimonial && <SuccessInfo />}
               </div>
            )}
         </div>
      </div>
   );
};
