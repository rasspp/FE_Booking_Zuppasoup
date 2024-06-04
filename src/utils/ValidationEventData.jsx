import validator from "validator";

export const ValidationEventData = (eventData, mode = "add", daysValidation = []) => {
   const errors = {};

   const { eventName, customerName, phoneNumber, guestCount, startDate, startTime, endTime, testimonial, accessKey } = eventData;

   if (validator.isEmpty(eventName)) {
      errors.eventName = "Nama acara tidak boleh kosong";
   } else if (!validator.isLength(eventName, { min: 6 })) {
      errors.eventName = "Nama acara harus memiliki minimal 6 karakter";
   } else if (!validator.isLength(eventName, { max: 60 })) {
      errors.eventName = "Nama acara maksimal memiliki 60 karakter";
   } else if (validator.matches(eventName, /\s{2,}/)) {
      errors.eventName = "Nama acara tidak boleh mengandung spasi yang berurutan";
   }

   // Validasi Nama Pemesan
   if (validator.isEmpty(customerName)) {
      errors.customerName = "Nama pemesan tidak boleh kosong";
   } else if (!validator.isLength(customerName, { min: 6 })) {
      errors.customerName = "Nama pemesan harus memiliki minimal 6 karakter";
   } else if (!validator.isLength(customerName, { max: 30 })) {
      errors.customerName = "Nama acara maksimal memiliki 30 karakter";
   } else if (!validator.matches(customerName, /^[a-zA-Z\s]*$/)) {
      errors.customerName = "Nama pemesan tidak boleh mengandung simbol atau angka";
   } else if (validator.matches(customerName, /\s{2,}/)) {
      errors.customerName = "Nama pemesan tidak boleh mengandung spasi yang berurutan";
   }

   // Validasi Nomor HP
   if (validator.isEmpty(phoneNumber)) {
      errors.phoneNumber = "Nomor HP tidak boleh kosong";
   } else if (!validator.isMobilePhone(phoneNumber, "id-ID")) {
      errors.phoneNumber = "Nomor HP tidak valid";
   }

   // Validasi Jumlah Porsi
   if (validator.isEmpty(guestCount)) {
      errors.guestCount = "Jumlah porsi tidak boleh kosong";
   } else if (!validator.isInt(guestCount, { min: 1 })) {
      errors.guestCount = "Jumlah porsi harus berupa angka positif";
   } else if (!validator.isLength(guestCount, { max: 3 })) {
      errors.guestCount = "Jumlah porsi maksimal 999";
   }

   // Validasi Jam Mulai
   if (validator.isEmpty(startTime)) {
      errors.startTime = "Jam mulai tidak boleh kosong";
   }

   // Validasi Jam Selesai
   if (validator.isEmpty(endTime)) {
      errors.endTime = "Jam selesai tidak boleh kosong";
   }

   // Validasi batas jam mulai dan selesai
   if (!validator.isEmpty(startTime) && !validator.isEmpty(endTime)) {
      const startDateTime = new Date(`2024-01-01T${startTime}`);
      let endDateTime = new Date(`2024-01-01T${endTime}`);

      // Periksa apakah jam selesai lebih awal dari jam mulai
      if (endDateTime < startDateTime) {
         // Jika ya, tambahkan 1 hari ke tanggal jam selesai
         endDateTime = new Date(endDateTime.getTime() + 86400000); // 86400000 milidetik = 1 hari
      }

      const minDurationHours = 1;
      const maxDurationHours = 8;
      const durationHours = (endDateTime - startDateTime) / (1000 * 60 * 60); // Menghitung durasi dalam jam

      if (durationHours > maxDurationHours) {
         errors.endTime = "Durasi acara maksimal 8 jam";
         errors.startTime = "Durasi acara maksimal 8 jam";
      }

      if (durationHours < minDurationHours) {
         errors.endTime = "Durasi acara minimal 1 jam";
         errors.startTime = "Durasi acara minimal 1 jam";
      }
   }

   // Validasi Tanggal
   if (validator.isEmpty(startDate)) {
      errors.startDate = "Tanggal tidak boleh kosong";
   } else {
      const selectedDate = new Date(startDate);

      if (mode === "add") {
         // Dapatkan tanggal hari ini
         const today = new Date();
         today.setHours(0, 0, 0, 0);

         // Dapatkan tanggal 3 hari setelah hari ini
         const threeDaysAfter = new Date(today);
         threeDaysAfter.setDate(today.getDate() + 3);

         if (selectedDate < threeDaysAfter) {
            errors.startDate = "Tanggal harus setidaknya 3 hari setelah hari ini";
         }
      }

      // Pengecekan tanggal yang sudah penuh
      const stringFormatSelectedDate = selectedDate.toISOString().slice(0, 10);
      const filteredDates = daysValidation.filter((event) => event.date === stringFormatSelectedDate);

      if (filteredDates.length > 3) {
         errors.startDate = "Mohon maaf, acara di tanggal ini sudah penuh";
      }
   }

   // Validasi Testimonial
   if (testimonial && !validator.isLength(testimonial, { min: 10 })) {
      errors.testimonial = "Testimonial harus memiliki minimal 10 karakter";
   }

   // Validasi Kunci Akses
   const keyWordAccess = import.meta.env.VITE_ACCESS_KEY;
   if (mode === "add") {
      if (validator.isEmpty(accessKey)) {
         errors.accessKey = "Kunci akses tidak boleh kosong";
      } else if (accessKey !== keyWordAccess) {
         errors.accessKey = "Kunci akses tidak valid";
      }
   }
   return errors;
};
