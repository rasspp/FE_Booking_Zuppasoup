import { useState } from "react";
import Login from "./../components/Login";
import Register from "./../components/Register";
import { FaArrowsRotate } from "react-icons/fa6";

export default function Auth() {
   const [formActive, setFormActive] = useState(false);
   const [changeMobileActive, setChangeMobileActive] = useState(false);

   const handleClick = () => {
      // Toggle formActive state
      setFormActive(!formActive);
   };

   const handleChangeMobile = () => {
      setChangeMobileActive(!changeMobileActive);
   };

   return (
      <section className="h-screen flex justify-center items-center bg-gray-900 pt-16">
         <div className="container-auth w-full md:w-9/12 relative min-h-96 max-h-96 grid grid-cols-1 justify-content md:items-center -mt-16 md:mt-0 rounded-lg group">
            <div className="image-login w-full md:w-6/12 hidden  md:block md:absolute z-20 p-20 md:h-[480px] bg-gray-600 border-4 border-orange-500 rounded-lg">
               <div
                  className="change-auth-button md:block md:absolute top-[3%] right-[3%] rounded-lg cursor-pointer shadow-md  text-xl flex justify-center items  text-white z-20 border-2 border-white p-2 hover:-mt-1 active:shadow-none active:mt-0 transition-all "
                  onClick={handleClick}
               >
                  <FaArrowsRotate />
               </div>

               <img src="./interior.svg" alt="login" className="w-full hidden md:block h-full pointer-events-none" />
            </div>

            <div
               className={`form-login w-screen md:w-6/12 md:absolute ${
                  formActive ? "md:left-0  md:z-10" : "md:left-[50%] "
               }  transition-all ease-in-out delay-75 duration-700`}
            >
               <Login setFormActive={setFormActive} formActive={formActive} handleChangeMobile={handleChangeMobile} changeMobileActive={changeMobileActive} />
            </div>

            <div
               className={`form-register w-screen md:w-6/12 md:absolute ${
                  formActive ? "md:left-[50%]  " : "md:left-0  md:z-10"
               }  transition-all ease-in-out delay-75 duration-700`}
            >
               <Register
                  setFormActive={setFormActive}
                  formActive={formActive}
                  handleChangeMobile={handleChangeMobile}
                  changeMobileActive={changeMobileActive}
               />
            </div>
         </div>
      </section>
   );
}
