import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const Login = () => {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   const navigate = useNavigate();

   useEffect(() => {
      if (isAuthenticated()) {
         navigate("/dashboard");
      }
   }, [navigate]);

   const handleLogin = async () => {
      try {
         const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
            username,
            password,
         });
         localStorage.setItem("username", username);
         localStorage.setItem("token", response.data.token);
         console.log("token:", response.data.token);

         navigate("/dashboard");
      } catch (error) {
         if (error.response && error.response.status === 401) {
            setError("Nama pengguna atau kata sandi salah");
         } else {
            console.error("Error during login:", error);
         }
      }
   };

   return (
      <section className="w-full min-h-screen flex items-center justify-center mt-5 ">
         <div className="w-9/12 max-h-96 bg-orange-500 flex justify-content items-center rounded-lg">
            <div className="image-login w-6/12 p-20 max-h-full bg-orange-50 border-4 border-orange-500 rounded-lg">
               <img src="./login.svg" alt="login" className="w-full h-full pointer-events-none" />
            </div>

            <div className="w-6/12 bg-white text-text p-8 rounded-r-lg shadow-md  custom-gradient">
               <h1 className="text-4xl text-center font-normal mb-4">Masuk Akun</h1>
               <hr />

               <div className="mb-4 mt-10">
                  <label className="custom-label">Nama Pengguna</label>
                  <input
                     type="text"
                     className="custom-input"
                     placeholder="Masukkan nama pengguna Anda"
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}
                     required
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
                     required
                  />
                  {error && <div className="text-white  text-sm mb-4">{error}</div>}
               </div>
               <div className="w-full flex justify-center items-center mt-10">
                  <button type="submit" className="primary-button w-full" onClick={handleLogin}>
                     Masuk
                  </button>
               </div>
            </div>
         </div>
      </section>
   );
};

export default Login;
