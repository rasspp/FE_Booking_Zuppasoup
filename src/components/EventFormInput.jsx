/* eslint-disable react/prop-types */
import { LuShieldCheck } from "react-icons/lu";
import { TiInfoOutline } from "react-icons/ti";

export const EventFormInput = ({ label, typeInput, nameInput, keyData, placeholder, handleChange, errors }) => {
   const SuccessInfo = () => {
      return (
         <div className="flex items-center h-10 gap-2 ml-2 text-green-400">
            <LuShieldCheck className="w-1/12 text-xl h-7" />
            <p className="w-11/12 flex items-center pt-1 text-sm leading-4 ">Tepat Sekali</p>
         </div>
      );
   };

   return (
      <div className="w-full h-24 px-2 mb-4 scale-90 md:scale-100">
         <label htmlFor={`${nameInput}`} className="custom-label capitalize min-w-20 w-fit">
            {label}
         </label>
         <input
            type={`${typeInput}`}
            className="custom-input"
            placeholder={`Masukkan ${placeholder || label}`}
            name={`${nameInput}`}
            id={`${nameInput}`} // Tambahkan id ke input
            value={keyData}
            onChange={handleChange}
            autoComplete="off"
            required
         />
         {errors[nameInput] && (
            <div className="flex items-center h-10 gap-2 ml-2">
               <TiInfoOutline className="w-1/12 text-xl h-7 text-orange-500" />
               <p className="w-11/12  text-orange-400 flex items-center pt-1 text-sm leading-4 ">{errors[nameInput]}</p>
            </div>
         )}
         {!errors[nameInput] && <SuccessInfo />}
      </div>
   );
};
