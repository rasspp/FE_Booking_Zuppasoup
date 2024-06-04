/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";
import validator from "validator";
import { FaRegCheckCircle } from "react-icons/fa";
import { TiInfoOutline } from "react-icons/ti";
import { FaArrowsRotate } from "react-icons/fa6";

const Login = ({ handleChangeMobile, changeMobileActive }) => {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [validationCheck, setValidationCheck] = useState("");
   const [loginAttempts, setLoginAttempts] = useState(0);
   const maxLoginAttempts = 5;
   const [maxTimeAttempts, setMaxTimeAttempts] = useState(5 * 60 * 1000);

   const [success, setSuccess] = useState(false);
   const navigate = useNavigate();

   useEffect(() => {
      if (isAuthenticated()) {
         navigate("/dashboard");
      }
   }, [navigate]);

   useEffect(() => {
      setValidationCheck("");
      if (username || password) {
         validateInputs();
      }
   }, [username, password]);

   const validateInputs = () => {
      // Validasi nama pengguna dan kata sandi menggunakan validator
      if (validator.isEmpty(username) || validator.isEmpty(password) || username.includes(" ") || password.includes(" ")) {
         setValidationCheck("Nama Pengguna dan Kata Sandi tidak boleh kosong atau mengandung spasi");
         return;
      }

      if (!validator.isLength(username, { min: 6 })) {
         setValidationCheck("Nama pengguna harus minimal 6 karakter");
         return;
      }
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
      } else {
         // login();
         return;
      }
   };

   const login = async () => {
      validateInputs();
      try {
         // Lakukan login hanya jika semua validasi terpenuhi
         if (!validationCheck) {
            const loginResponse = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
               username,
               password,
            });

            if (loginResponse.status === 200) {
               console.clear();
               localStorage.setItem("username", username);
               localStorage.setItem("token", loginResponse.data.token);
               console.group(`Login berhasil! \n-> Token: ${loginResponse.data.token}
               `);

               setLoginAttempts(0);
               setSuccess(true);
               setUsername("");
               setPassword("");
               setTimeout(() => {
                  setSuccess(false);
                  navigate("/dashboard");
               }, 2000);
               return;
            }
         }
      } catch (error) {
         if (error.response.status === 401) {
            console.error("Kesalahan login dengan status 401 atau Akses ditolak!");
            setValidationCheck(`Nama Pengguna atau Kata Sandi Salah`);
            setLoginAttempts(loginAttempts + 1);
         }
         console.error("Error saat Login:", error);

         if (loginAttempts + 1 >= maxLoginAttempts) {
            const menitError = Math.floor(maxTimeAttempts / 60000); // Mengonversi detik menjadi menit

            setValidationCheck(`Anda telah mencapai batas maksimum percobaan login (${maxLoginAttempts}). Coba lagi nanti dalam ${menitError} menit.`);

            setTimeout(() => {
               setLoginAttempts(0);
               setValidationCheck("");
            }, maxTimeAttempts);
         }
      }
   };

   const handleLogin = async (e) => {
      e.preventDefault(); // Mencegah pengiriman form default
      // validateInputs();
      login();
   };

   // Event handler untuk menangani tekanan tombol "Enter"
   const handleKeyPress = (event) => {
      if (event.key === "Enter") {
         // Tambahkan percabangan untuk menampilkan pesan kesalahan jika batas percobaan login tercapai
         if (loginAttempts >= maxLoginAttempts) {
            setValidationCheck(
               `Anda telah mencapai batas maksimum percobaan login (${maxLoginAttempts}). Coba lagi nanti dalam ${Math.floor(
                  maxTimeAttempts / (1000 * 60)
               )} menit ${((maxTimeAttempts / 1000) % 60).toFixed(0)} detik.`
            );
            return;
         }

         // Handle login hanya jika jumlah percobaan login masih kurang dari batas maksimum
         handleLogin(event);
      }
   };

   return (
      <div
         className={`w-full md:w-full bg-white text-text p-4 md:p-8 rounded-none md:rounded-r-lg shadow-md  custom-gradient ${
            changeMobileActive ? "hidden md:block" : "block"
         }`}
      >
         <h1 className="text-2xl md:text-4xl text-center font-normal mb-4 text-nowrap flex justify-center items-center gap-3 md:block ">
            <div className="md:hidden w-2/12 flex justify-end" onClick={handleChangeMobile}>
               <FaArrowsRotate />
            </div>
            <div className="w-full flex justify-start md:block text-center">Masuk Akun</div>
         </h1>
         <hr />

         <form onSubmit={handleLogin} className="pt-0  scale-90 md:scale-100">
            <div className="mb-4 mt-5 md:mt-10">
               <label className="custom-label w-fit">Nama Pengguna</label>
               <input
                  type="text"
                  className="custom-input"
                  placeholder="Masukkan nama pengguna Anda"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={handleKeyPress}
                  required
               />
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
            </div>
            {validationCheck && (
               <div className="text-white text-shadow-sm text-sm mb-4 mt-2 flex items-center gap-1">
                  <TiInfoOutline className="w-1/12 text-xl" />
                  <p className="w-11/12">{validationCheck}</p>
               </div>
            )}
            <div className="w-full flex  justify-center items-center mt-10 ">
               <button
                  type="submit"
                  className="primary-button w-full focus:outline-offset-4 focus:outline-none focus:outline-2 focus:outline-white"
                  disabled={loginAttempts >= maxLoginAttempts}
               >
                  Masuk
               </button>
            </div>
         </form>

         {/* Modal pemberitahuan */}
         {success && (
            <div className="fixed z-30 top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 transition-all">
               <div className="bg-orange-500 border-2 border-white rounded-md shadow-lg text-center p-10">
                  <p className="w-full text-center p-7">
                     <FaRegCheckCircle className="w-full text-green-400 text-7xl" />
                  </p>
                  <p className="text-3xl text-white font-semibold ">Yeay! Anda berhasil masuk ke akun Anda</p>
                  <p className="text-md text-white">Tolong tunggu beberapa saat...</p>
               </div>
            </div>
         )}
      </div>
   );
};

export default Login;
