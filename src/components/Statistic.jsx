import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { CategoryScale, LinearScale, TimeScale, Chart as ChartJS } from "chart.js/auto";
import axios from "axios";

ChartJS.register(CategoryScale, LinearScale, TimeScale);

const getPorsiData = (events, status) => {
   const porsiData = Array(6).fill(0);

   events.forEach((event) => {
      const monthIndex = new Date(event.start).getMonth();
      if (event.status === status) {
         porsiData[monthIndex] += parseInt(event.guestCount);
      }
   });

   return porsiData;
};

const getTotalData = (events) => {
   const totalData = Array(6).fill(0);

   events.forEach((event) => {
      const monthIndex = new Date(event.start).getMonth();
      totalData[monthIndex] += parseInt(event.guestCount);
   });

   return totalData;
};

export const Statistic = () => {
   const [events, setEvents] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/event`);
            setEvents(response.data);
            setLoading(false);
         } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
         }
      };

      fetchData();
   }, []);

   if (loading) {
      return <div className="text-white">Loading...</div>;
   }

   const data = {
      labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"],
      datasets: [
         {
            label: "DP",
            data: getPorsiData(events, "DP"),
            fill: false,
            borderColor: "orange",
            tension: 0.1,
         },
         {
            label: "Pending",
            data: getPorsiData(events, "Pending"),
            fill: false,
            borderColor: "red",
            tension: 0.1,
         },
         {
            label: "Lunas",
            data: getPorsiData(events, "Lunas"),
            fill: false,
            borderColor: "green",
            tension: 0.1,
         },
         {
            label: "Total",
            data: getTotalData(events),
            fill: false,
            borderColor: "blue",
            borderWidth: 2,
            tension: 0.1,
         },
      ],
   };

   return (
      <div className="w-full h-full">
         <Line data={data} />
      </div>
   );
};
