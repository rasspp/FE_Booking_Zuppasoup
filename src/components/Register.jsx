/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import validator from "validator";
import { TiInfoOutline } from "react-icons/ti";
import { IoInformationCircleOutline } from "react-icons/io5";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";

const Register = ({ handleChangeMobile, changeMobileActive, formActive, setFormActive }) => {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [keyAccess, setKeyAccess] = useState("");
   const [validationCheck, setValidationCheck] = useState("");
   const [success, setSuccess] = useState(false); // State untuk menampilkan modal pemberitahuan
   const [showInfoKeyAccess, setShowInfoKeyAccess] = useState(false);
   const keyWordAccess = import.meta.env.VITE_ACCESS_KEY;

   // Gunakan useEffect untuk memanggil fungsi validasi setiap kali ada perubahan pada state
   useEffect(() => {
      setValidationCheck("");
      if (username || password || keyAccess) {
         validateInputs();
      }
   }, [username, password, keyAccess]);

   const validateInputs = () => {
      // Validasi data kosong
      if (validator.isEmpty(username) || validator.isEmpty(password) || username.includes(" ") || password.includes(" ")) {
         setValidationCheck("Nama Pengguna dan Kata Sandi tidak boleh kosong atau mengandung spasi");
         return;
      }

      // Validasi nama pengguna
      if (!validator.isLength(username, { min: 6 })) {
         setValidationCheck("Nama pengguna harus minimal 6 karakter");
         return;
      }

      // Validasi kata sandi
      if (
         !validator.isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
         })
      ) {
         setValidationCheck(`Kata sandi harus memiliki minimal 8 karakter, huruf kapital, huruf kecil, angka, dan simbol. Contoh "Katasandi_1234"`);
         return;
      }

      // Validasi kunci akses
      if (validator.isEmpty(keyAccess)) {
         setValidationCheck("Kunci Akses tidak boleh kosong");
         return;
      }

      if (keyAccess !== keyWordAccess) {
         setValidationCheck("Kunci Akses ditolak!");
         return;
      }

      // Jika semua validasi terlewati, set validationCheck menjadi kosong
      setValidationCheck("");
   };

   const handleRegister = async (e) => {
      e.preventDefault(); // Mencegah pengiriman form default

      try {
         // Memanggil fungsi validasi sebelum melakukan registrasi
         validateInputs();

         // Jika ada error, hentikan proses registrasi
         if (validationCheck) return;

         // Lakukan registrasi jika tidak ada error
         const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
            username,
            password,
         });

         console.log("Registration successful:", response.data.message);
         setSuccess(true);
         setUsername("");
         setPassword("");
         setKeyAccess("");
         setTimeout(() => {
            setSuccess(false);
            setFormActive(!formActive);
         }, 3000);
      } catch (error) {
         if (error.response) {
            console.log("Error response from server:", error.response.data);
            if (!username.trim() && !password.trim()) {
               return;
            }
            if (error.response.status === 409) {
               setValidationCheck("Nama pengguna sudah digunakan");
            } else {
               console.error("Error during registration:", error.response.data.message);
            }
         } else {
            console.error("Error during registration:", error.message);
         }
      }
   };

   const handleKeyPress = (event) => {
      if (event.key === "Enter") {
         handleRegister(event);
      }
   };

   return (
      <div
         className={`w-full md:w-full bg-white text-text p-4 md:p-8 rounded-none md:rounded-r-lg shadow-md custom-gradient  ${
            !changeMobileActive ? "hidden md:block" : "block"
         }`}
      >
         <h1 className="text-2xl md:text-4xl text-center font-normal mb-4 flex justify-center items-center gap-3 md:block text-nowrap">
            <div className="md:hidden w-2/12 flex justify-end" onClick={handleChangeMobile}>
               <FaArrowsRotate />
            </div>
            <div className="w-full flex justify-start md:block text-center">Buat Akun</div>
         </h1>
         <hr />

         <form onSubmit={handleRegister} className="pt-5 md:pt-10 scale-90 md:scale-100">
            <div className="mb-4">
               <label className="custom-label w-fit">Nama Pengguna</label>
               <div className="flex justify-between gap-2">
                  <input
                     type="text"
                     className="custom-input"
                     placeholder="Nama pengguna Anda"
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}
                     onKeyPress={handleKeyPress}
                     required
                  />
               </div>
            </div>

            <div className="mb-2">
               <label className="custom-label w-fit">Kata Sandi</label>
               <input
                  type="password"
                  className="custom-input"
                  placeholder="Masukkan kata sandi Anda"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  required
               />
               {validationCheck && (
                  <div className="text-white text-shadow-sm text-sm mb-4 mt-2 flex items-center gap-1">
                     <TiInfoOutline className="w-1/12 text-xl" />
                     <p className="w-11/12">{validationCheck}</p>
                  </div>
               )}
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-3 justify-between items-center mt-10 gap-2">
               <div className="w-full md:col-span-2 relative mb-3 md:mb-0">
                  <input
                     type="text"
                     className="custom-input"
                     placeholder="Kunci akses"
                     value={keyAccess}
                     onChange={(e) => setKeyAccess(e.target.value)}
                     onKeyPress={handleKeyPress}
                     required
                  />

                  {showInfoKeyAccess && (
                     <div className="w-80 h-30 text-center bg-orange-500 border-2 border-white text-white rounded-md absolute -top-[s20px] md:-top-[70px] left-0 md:left-14 py-1 px-3 scale-50 md:scale-100">
                        Hubungi Admin via Whatsapp untuk mendapatkan &quot;kunci akses&quot;
                     </div>
                  )}

                  <IoInformationCircleOutline
                     className="absolute text-orange-500 top-2 right-2 text-2xl cursor-pointer"
                     onMouseEnter={() => setShowInfoKeyAccess(true)}
                     onMouseLeave={() => setShowInfoKeyAccess(false)}
                  />
               </div>

               <button type="submit" className="w-full primary-button focus:outline-offset-4 focus:outline-none focus:outline-2 focus:outline-white">
                  Daftar
               </button>
            </div>
         </form>

         {/* Modal pemberitahuan */}
         {success && (
            <div className="fixed z-30 top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
               <div className="bg-orange-500 border-2 border-white rounded-md shadow-lg text-center p-10">
                  <p className="w-full text-center p-7">
                     <FaRegCheckCircle className="w-full text-green-400 text-7xl" />
                  </p>
                  <p className="text-3xl text-white font-semibold ">Pendaftaran akun berhasil!</p>
                  <p className="text-md text-white">Silahkan Login terlebih dahulu.</p>
               </div>
            </div>
         )}
      </div>
   );
};

export default Register;
