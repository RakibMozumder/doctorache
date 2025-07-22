// Auto Slide Carousel
      setInterval(() => {
        const carousel = document.getElementById("servicesCarousel");
        carousel.scrollLeft += 220;
        if (
          carousel.scrollLeft + carousel.clientWidth >=
          carousel.scrollWidth
        ) {
          carousel.scrollLeft = 0;
        }
      }, 3000);