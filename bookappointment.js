document.getElementById("appointmentForm").addEventListener("submit", function (e) {
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
    Object.values(errors).forEach(err => err.style.display = "none");
    [name, email, phone, service, date].forEach(field => field.classList.remove("error-border"));

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


    // Save to localStorage
    const appointment = {
      name: name.value,
      email: email.value,
      phone: phone.value,
      service: service.value,
      date: date.value
    };

    const existing = JSON.parse(localStorage.getItem("appointments")) || [];
    existing.push(appointment);
    localStorage.setItem("appointments", JSON.stringify(existing));

   
    // Show toast
    const toast = document.getElementById("toast");
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);

    //clear form
    this.reset();
  });




