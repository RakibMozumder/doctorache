
  document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Basic validation (you can expand this or send to server)
    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const subject = document.getElementById("contactSubject").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    if (!name || !email || !subject || !message) {
      alert("❌ Please fill out all fields.");
      return;
    }

    alert("✅ Message sent successfully!");
    this.reset();
  });

