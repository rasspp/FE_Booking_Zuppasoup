import { Navigation, Autoplay, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

export default function HeroSlider() {
   return (
      <section className="relative w-full h-screen hero-slider ">
         <Swiper
            className="h-full"
            modules={[Navigation, Autoplay, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            autoplay={{ delay: 2000 }}
            // navigation
            // pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
         >
            <SwiperSlide>
               <div className="h-full w-full bg-cover bg-center bg-blue-500 " style={{ backgroundImage: `url('gambar1.jpg')` }}></div>
            </SwiperSlide>
            <SwiperSlide>
               <div className="h-full w-full bg-cover bg-center bg-blue-500 " style={{ backgroundImage: `url('gambar2.jpg')` }}></div>
            </SwiperSlide>
            <SwiperSlide>
               <div className="h-full w-full bg-cover bg-center bg-blue-500 " style={{ backgroundImage: `url('gambar3.jpg')` }}></div>
            </SwiperSlide>
            <SwiperSlide>
               <div className="h-full w-full bg-cover bg-center bg-blue-500 " style={{ backgroundImage: `url('gambar4.jpg')` }}></div>
            </SwiperSlide>
            <SwiperSlide>
               <div className="h-full w-full bg-cover bg-center bg-blue-500 " style={{ backgroundImage: `url('gambar5.jpg')` }}></div>
            </SwiperSlide>
         </Swiper>

         <div className="absolute hero-content top-0 w-full h-full z-10 bg-gradient-to-r from-orange-500 to-transparent ">
            <div className="mt-44 w-11/12 ml-[3%] md:ml-40 h-8/12 text-white bg-white/10 md:w-6/12 border border-white/20 rounded-2xl p-10 backdrop-blur ">
               <h2 className="text-4xl font-bold tracking-wide">
                  <span className="text-gray-800">Zuppasoup</span> - Booking App
               </h2>
               <p className="text-lg pt-3 mb-5 ">Kami membantumu mempermudah pemesananmu, dan Jadikan pernikahanmu yang terbaik dengan kami!</p>
               <a href="#calendar" className=" py-2 px-5 primary-button text-white rounded-md  w-fit shadow-xl scroll-smooth">
                  Cek Kalendar
               </a>
            </div>
         </div>
      </section>
   );
}
