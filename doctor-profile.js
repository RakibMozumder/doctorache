let doctorId = null; // declare doctorId globally
let selectedRating = 0;

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("profileContainer");

  const urlParams = new URLSearchParams(window.location.search);
  doctorId = parseInt(urlParams.get("id"));

  const doctor = doctors.find(d => d.id === doctorId);

  if (!doctor) {
    container.innerHTML = `<p>Doctor not found.</p>`;
    return;
  }
  // Load all reviews
      const allReviews =
        JSON.parse(localStorage.getItem("doctorReviews")) || [];
  
  const docReviews = allReviews.filter((r) => r.doctorId === doctor.id);
          const avgRating = docReviews.length
            ? (
                docReviews.reduce((sum, r) => sum + r.rating, 0) /
                docReviews.length
              ).toFixed(1)
            : "No ratings";
  container.innerHTML = `
    <div class="profile-card">
      <img src="${doctor.image}" alt="${doctor.name}" />
      <h2>${doctor.name}</h2>
      <h4>${doctor.specialty}</h4>
      <p><strong>Availability:</strong> ${doctor.availability}</p>
      <p>⭐ ${avgRating === "No ratings" ? avgRating : `${avgRating}/5`}</p>
      <p>${doctor.bio}</p>
      <a href="all-doctors.html#doctors" class="btn-view">← Back to Doctors</a>
    </div>
  `;

  // ⭐ Setup star click events
  document.querySelectorAll('#starRating span').forEach(star => {
    star.addEventListener('click', () => {
      selectedRating = parseInt(star.dataset.rate);
      document.querySelectorAll('#starRating span').forEach(s => {
        s.style.color = s.dataset.rate <= selectedRating ? '#f59e0b' : '#ccc';
      });
    });
  });

  // 📥 Submit review
  document.getElementById("submitReview").addEventListener("click", () => {
    const text = document.getElementById("reviewText").value.trim();
    if (selectedRating === 0 || text === "") {
      alert("Please give a rating and write a review.");
      return;
    }

    const review = { doctorId: doctorId, rating: selectedRating, text };

    const allReviews = JSON.parse(localStorage.getItem("doctorReviews")) || [];
    allReviews.push(review);
    localStorage.setItem("doctorReviews", JSON.stringify(allReviews));

    loadReviews();
    document.getElementById("reviewText").value = "";
    selectedRating = 0;
    document.querySelectorAll('#starRating span').forEach(s => s.style.color = '#ccc');
  });

  loadReviews(); // load reviews after doctorId is available
});

// 🧾 Load reviews for current doctor
function loadReviews() {
  const allReviews = JSON.parse(localStorage.getItem("doctorReviews")) || [];
  const filtered = allReviews.filter(r => r.doctorId === doctorId);

  const list = document.getElementById("reviewsList");
  list.innerHTML = "";

  filtered.forEach(r => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="review-box">
        <div class="review-stars">⭐ ${r.rating}/5</div>
        <p>${r.text}</p>
      </div>
    `;
    list.appendChild(li);
  });
}
