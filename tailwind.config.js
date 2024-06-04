/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         colors: {
            primary: "#E48103",
            // primary: "#4682b4",
            text: "#ffffff",
         },
      },
   },
   plugins: [],
};
