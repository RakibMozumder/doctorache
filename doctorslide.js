
// Helper to convert rating number to stars
function renderStars(rating) {
  const full = "★".repeat(Math.floor(rating));
  const empty = "☆".repeat(5 - Math.floor(rating));
  return `<span style="color:#fbbf24; font-size: 16px;">${full}${empty}</span>`;
}
   
document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById("doctorSlider");

    const allReviews = JSON.parse(localStorage.getItem("doctorReviews")) || [];



    doctors.forEach((doc) => {
      const docReviews = allReviews.filter(r => r.doctorId === doc.id);
      const avgRating = docReviews.length
        ? (docReviews.reduce((sum, r) => sum + r.rating, 0) / docReviews.length).toFixed(1)
        : "No ratings";

      // const card = document.createElement("div");
      // card.className = "doctor-card";
      // card.innerHTML = `
      //   <img src="${doc.image}" alt="${doc.name}" />
      //   <h3>${doc.name}</h3>
      //   <p>${doc.specialty}</p>
      //   <p>${doc.availability}</p>
      //   <p>⭐ ${avgRating === "No ratings" ? avgRating : `${avgRating}/5`}</p>
      //   <a href="doctor-profile.html?id=${doc.id}" class="btn-view">View Profile</a>
      // `;
      const card = document.createElement("div");
      card.className = "doctor-card";
      card.innerHTML = `
      <a href="doctor-profile.html?id=${doc.id}">
      <img src="${doc.image}" alt="${doc.name}" />
      <h3>${doc.name}</h3>
      <p>${doc.specialty}</p>
      <p><strong>Rating:</strong> ${renderStars(doc.rating)}</p>
      </a>
      `;
      slider.appendChild(card);
    });

    // Auto-scroll every 4 seconds
    // let scrollAmount = 0;
    // setInterval(() => {
    //   const cardWidth = slider.querySelector(".doctor-card")?.offsetWidth || 280;
    //   scrollAmount += cardWidth + 20; // card + gap

    //   if (scrollAmount >= slider.scrollWidth - slider.clientWidth) {
    //     scrollAmount = 0; // Reset to start
    //   }

    //   slider.scrollTo({
    //     left: scrollAmount,
    //     behavior: 'smooth'
    //   });
    // }, 4000);
    // Auto Slide Carousel
      setInterval(() => {
        const carousel = document.getElementById("doctorSlider");
        carousel.scrollLeft += 220;
        if (
          carousel.scrollLeft + carousel.clientWidth >=
          carousel.scrollWidth
        ) {
          carousel.scrollLeft = 0;
        }
      }, 3000);
    
  });