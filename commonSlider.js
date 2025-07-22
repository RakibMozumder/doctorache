      function autoSlide(containerId, interval = 4000) {
        const container = document.getElementById(containerId);
        let scrollAmount = 0;

        setInterval(() => {
          if (
            container.scrollLeft + container.clientWidth >=
            container.scrollWidth
          ) {
            container.scrollTo({ left: 0, behavior: "smooth" });
          } else {
            container.scrollBy({ left: 300, behavior: "smooth" });
          }
        }, interval);
      }

      autoSlide("blogSlider2");
      autoSlide("testimonialSlider2");