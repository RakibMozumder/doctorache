document
    .getElementById("appointmentForm")
    .addEventListener("submit", async function (e) {
      e.preventDefault();

      // Fields
      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const phone = document.getElementById("phone");
      const service = document.getElementById("service");
      const date = document.getElementById("date");

      // Error messages
      const errors = {
        name: document.getElementById("error-name"),
        email: document.getElementById("error-email"),
        phone: document.getElementById("error-phone"),
        service: document.getElementById("error-service"),
        date: document.getElementById("error-date"),
      };

      // Clear previous errors
      Object.values(errors).forEach((err) => (err.style.display = "none"));
      [name, email, phone, service, date].forEach((field) =>
        field.classList.remove("error-border")
      );

      let hasError = false;

      // Validation checks
      if (name.value.trim() === "") {
        errors.name.innerText = "Name is required";
        errors.name.style.display = "block";
        name.classList.add("error-border");
        hasError = true;
      }

      if (email.value.trim() === "") {
        errors.email.innerText = "Email is required";
        errors.email.style.display = "block";
        email.classList.add("error-border");
        hasError = true;
      }

      if (phone.value.trim() === "") {
        errors.phone.innerText = "Phone number is required";
        errors.phone.style.display = "block";
        phone.classList.add("error-border");
        hasError = true;
      }

      if (service.value === "") {
        errors.service.innerText = "Please select a service";
        errors.service.style.display = "block";
        service.classList.add("error-border");
        hasError = true;
      }

      if (date.value === "") {
        errors.date.innerText = "Please choose a date";
        errors.date.style.display = "block";
        date.classList.add("error-border");
        hasError = true;
      }

      if (hasError) return;

      // ✅ Prepare appointment
      const appointment = {
        name: name.value,
        email: email.value,
        phone: phone.value,
        service: service.value,
        date: date.value,
      };


     // ✅ save to local storage
    const existing = JSON.parse(localStorage.getItem("appointments")) || [];
    existing.push(appointment);
    localStorage.setItem("appointments", JSON.stringify(existing));

      // ✅ Send to backend (MongoDB)
      try {
        const response = await fetch(
          "http://localhost:5000/api/appointments",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(appointment),
          }
        );

        if (!response.ok) throw new Error("Server error");

        // ✅ Success Toast
        const toast = document.getElementById("toast");
        toast.innerText = "✅ Appointment Booked Successfully!";
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 3000);

        this.reset(); // ✅ Clear form

      } catch (error) {
        alert("❌ Failed to book appointment. Please try again later.");
        console.error("Error:", error);
      }
    });




    


