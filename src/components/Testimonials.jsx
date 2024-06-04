import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import { IoIosPerson } from "react-icons/io";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import "swiper/css/effect-coverflow";
import { useEffect, useState } from "react";
import axios from "axios";

const Testimonials = () => {
   const [testimonials, setTestimonials] = useState([]);

   useEffect(() => {
      const fetchTestimonials = async () => {
         try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/event`);
            const events = response.data;

            if (events && Array.isArray(events)) {
               // Filter testimonials
               const testimonialsData = events
                  .filter((event) => event.testimonial && event.testimonial.trim() !== "")
                  .map((event) => ({
                     message: event.testimonial,
                     name: event.customerName,
                     title: event.title,
                  }));
               setTestimonials(testimonialsData);
            } else {
               console.log("Tidak ada data event yang ditemukan dalam respons.");
            }
         } catch (error) {
            console.error("Error dalam mengambil data testimonial:", error);
         }
      };

      fetchTestimonials();
   }, []);

   return (
      <div className="swiper-container mb-10 md:mb-32">
         <div className="header w-full md:h-32 flex justify-center items-center">
            <h2 className="text-xl md:text-3xl">Apa Kata Mereka?</h2>
         </div>

         {/* Slide Testimonial */}
         <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            spaceBetween={30}
            loop={true}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 20000 }}
            breakpoints={{
               640: {
                  slidesPerView: 1,
               },
               768: {
                  slidesPerView: 2,
               },
               1024: {
                  slidesPerView: 3,
               },
            }}
            coverflowEffect={{
               rotate: 50,
               stretch: 0,
               depth: 100,
               modifier: 1,
               slideShadows: true,
            }}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
         >
            {Array.isArray(testimonials) &&
               testimonials.map((testimonial, index) => (
                  <SwiperSlide key={index}>
                     <div className="bg-gray-900 rounded-lg shadow-md p-6 mx-4 my-8 w-11/12 ">
                        <p className="text-gray-200 mb-4 text-md md:text-xl">&quot;{testimonial.message}&quot;</p>
                        <div className="flex items-center">
                           <div className="flex-shrink-0">
                              <div className="w-12 h-12 rounded-full bg-gray-900 border-2 border-gray-200 overflow-hidden flex justify-center items-center">
                                 <IoIosPerson className="text-3xl text-gray-200" />
                              </div>
                           </div>
                           <div className="ml-4">
                              <p className="text-lg font-semibold text-orange-500">{testimonial.name}</p>
                              <p className="text-gray-500">{testimonial.title}</p>
                           </div>
                        </div>
                     </div>
                  </SwiperSlide>
               ))}
         </Swiper>
      </div>
   );
};

export default Testimonials;
