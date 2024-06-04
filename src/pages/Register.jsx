import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   const navigate = useNavigate();

   const handleRegister = async () => {
      try {
         if (password.length < 6) {
            setError("Kata sandi harus minimal 6 karakter");
            return;
         }

         const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
            username,
            password,
         });

         console.log("Registration successful:", response.data.message);
         navigate("/login");
      } catch (error) {
         if (error.response) {
            console.log("Error response from server:", error.response.data);
            if (error.response.status === 409) {
               setError("Nama pengguna sudah digunakan");
            } else {
               console.error("Error during registration:", error.response.data.message);
            }
         } else {
            console.error("Error during registration:", error.message);
         }
      }
   };

   return (
      <section className="w-full min-h-screen flex items-center justify-center mt-5 ">
         <div className="w-9/12 max-h-96 bg-orange-500 flex justify-content items-center rounded-lg">
            <div className="image-login w-6/12 p-20 max-h-full bg-orange-50 border-4 border-orange-500 rounded-lg">
               <img src="./auth.svg" alt="login" className="w-full h-full pointer-events-none" />
            </div>

            <div className="w-6/12 bg-white text-text p-8 rounded-r-lg shadow-md  custom-gradient">
               <h1 className="text-4xl text-center font-normal mb-4">Buat Akun</h1>
               <hr />

               <div className="mb-4 mt-10">
                  <label className="custom-label">Nama Pengguna</label>
                  <input
                     type="text"
                     className="custom-input"
                     placeholder="Masukkan nama pengguna Anda"
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}
                  />
               </div>
               <div className="mb-4">
                  <label className="custom-label">Kata Sandi</label>
                  <input
                     type="password"
                     className="custom-input"
                     placeholder="Masukkan kata sandi Anda"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                  />
                  {error && <div className="text-white text-shadow-sm text-sm mb-4">{error}</div>}
               </div>
               <div className="w-full flex justify-center items-center mt-10">
                  <button type="submit" className="w-full primary-button" onClick={handleRegister}>
                     Daftar
                  </button>
               </div>
            </div>
         </div>
      </section>
   );
};

export default Register;
