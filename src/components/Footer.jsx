import { Link } from "react-router-dom";
import { IoCallOutline, IoMailOpenOutline } from "react-icons/io5";

export default function Footer() {
   return (
      <footer className="bg-gray-900 text-gray-300 py-12">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
               {/* tentang kami */}
               <div className="col-span-1 md:col-span-2 lg:col-span-1">
                  <h2 className="text-sm sm:text-lg font-semibold mb-4 border-b-2 border-orange-500 pb-2">Tentang Kami</h2>
                  <p className="text-[12px] sm:text-sm">Booking Zuppasoup adalah sebuah web aplikasi untuk memesan produk kami dengan lebih mudah</p>
               </div>

               {/* lokasi kami */}
               <div className="col-span-1 md:col-span-1">
                  <h2 className="text-sm sm:text-lg font-semibold mb-4 border-b-2 border-orange-500 pb-2 ">Lokasi Kami</h2>
                  <p className="text-[12px] sm:text-sm">
                     Jl Raya Tengah no 31, Pasar Rebo
                     <br />
                     Jakarta Timur
                     <br />
                     Indonesia
                  </p>
               </div>

               {/* hubungi kami */}
               <div className="col-span-1 md:col-span-2 lg:col-span-1">
                  <h2 className="text-sm sm:text-lg font-semibold mb-4 border-b-2 border-orange-500 pb-2 ">Hubungi Kami</h2>
                  <p className="text-[12px] sm:text-sm flex gap-2">
                     <IoCallOutline className="text-xl" /> +62-8953-4123-7733
                  </p>
                  <p className="text-[12px] sm:text-sm flex gap-2">
                     <IoMailOpenOutline className="text-xl" /> reza@fauzan.web.id
                  </p>
               </div>

               {/* ikuti kami */}
               <div className="col-span-1 md:col-span-2 lg:col-span-1">
                  <h2 className="text-sm sm:text-lg font-semibold mb-4 border-b-2 border-orange-500 pb-2 ">Ikuti Kami</h2>
                  <p className="text-[12px] sm:text-sm">
                     <a href="https://www.facebook.com/ginza.zuppasoup?mibextid=2JQ9oc" className="text-gray-300 hover:text-white">
                        Facebook
                     </a>
                     <br />
                     <a href="https://www.instagram.com/zuppasoup.ginza?igsh=dXM1bXN4YzE3bWtw" className="text-gray-300 hover:text-white">
                        Instagram
                     </a>
                     <br />
                  </p>

                  <p className="text-sm text-orange-300">
                     <Link to="/reza" className="cursor-auto">
                        Zuppasoup
                     </Link>{" "}
                     &copy;Copyright {new Date().getFullYear()}
                  </p>
               </div>

               {/* dikembangkan oleh */}
               <div className="col-span-1 md:col-span-2 lg:col-span-1">
                  <h2 className="text-[12px] sm:text-lg font-semibold mb-4 border-b-2 border-orange-500 pb-2">Dikembangkan Oleh</h2>
                  <p className="text-sm pt-3">
                     <a href="https://rassp.my.id" className="text-white  primary-button font-semibold " target="_blank" rel="noopener noreferrer">
                        RASS
                     </a>
                  </p>
               </div>
            </div>

            <div className="grid grid-cols-1">
               <p className=" justify-center w-full"></p>
            </div>
         </div>
      </footer>
   );
}
