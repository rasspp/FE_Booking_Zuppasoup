import { Link, useLocation, useNavigate } from "react-router-dom";
import { TbLogin2, TbLogout2 } from "react-icons/tb";
import { FaUserEdit } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
   const navigate = useNavigate();
   const [isScrolled, setIsScrolled] = useState(false);
   const navbarRef = useRef(null);
   const [textColor, setTextColor] = useState("text-text");
   const location = useLocation(); // Dapatkan informasi lokasi saat ini

   useEffect(() => {
      const handleScroll = () => {
         if (location.pathname === "/" || location.pathname === "/auth") {
            // Cek apakah di halaman home
            setIsScrolled(window.scrollY > 900); // Atur isScrolled hanya jika di halaman home

            if (navbarRef.current) {
               const rgb = getComputedStyle(navbarRef.current).backgroundColor.match(/\d+/g).map(Number);
               const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
               setTextColor(brightness > 128 ? "text-text" : "text-red-500"); // Atur warna teks
            }
         }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
   }, [location]);

   const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      navigate("/auth");
   };

   const isLoggedIn = !!localStorage.getItem("token");

   return (
      <nav ref={navbarRef} className={`p-4 fixed top-0 left-0 right-0 h-20 shadow-md z-40 md:px-10 bg-white/30 backdrop:blur`}>
         <div className="flex items-center justify-between  ">
            <Link to="/" className="flex items-center relative">
               <h1
                  className={` text-md p-2 py-1 md:text-xl  primary-font font-semibold uppercase primary-button  ${
                     isScrolled ? "text-gray-900 bg-gray-300" : "text-text"
                  }`}
               >
                  Zuppasoup
               </h1>
               {/* <img
                  src="/logo.png"
                  alt="Logo"
                  className="w-6 h-6 hidden md:block border-2 border-white bg-white rounded-full absolute -right-3 -top-3 logo-animate"
               /> */}
            </Link>

            {isLoggedIn ? (
               <div className="flex items-center gap-1 md:gap-4">
                  <Link
                     to="/dashboard"
                     className={` primary-button  justify-center px-3 md:px-4 flex items-center md:gap-2  ${
                        isScrolled ? "text-gray-900 bg-gray-300" : "text-text"
                     }`}
                  >
                     <FaUserEdit className="text-xl" /> <div className="hidden md:block">Dasbor </div>
                  </Link>
                  <button
                     onClick={handleLogout}
                     className={` primary-button justify-center px-3 md:px-4 flex items-center md:gap-2  ${
                        isScrolled ? "text-gray-900 bg-gray-300" : "text-text"
                     }`}
                  >
                     <TbLogout2 className="text-xl" /> <div className="hidden md:block">Keluar</div>
                  </button>
               </div>
            ) : (
               <div className="flex items-center">
                  <Link to="/auth" className="text-text primary-button justify-center px-3 sm:px-4 flex items-center sm:gap-2">
                     <TbLogin2 className="text-xl" /> <div className="hidden sm:block">Masuk</div>
                  </Link>
               </div>
            )}
         </div>
      </nav>
   );
};

export default Navbar;
