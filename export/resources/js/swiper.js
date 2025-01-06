import Swiper from "swiper";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css/bundle";

// Swiper
document.addEventListener("DOMContentLoaded", () => {
    const swiperElement = document.querySelector(".swiper");

    // Get the column values from data attributes
    const colsSm = parseInt(swiperElement.dataset.colsSm);
    const colsMd = parseInt(swiperElement.dataset.colsMd);
    const colsLg = parseInt(swiperElement.dataset.colsLg);

    const swiper = new Swiper(".swiper", {
        modules: [Autoplay, Navigation, Pagination],

        direction: "horizontal",
        loop: true,
        autoplay: {
            delay: 7000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        // speed: 10000,
        slidesPerView: "auto",
        spaceBetween: 40,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        // Navigation arrows
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            // Mobile first
            0: {
                slidesPerView: colsSm,
            },
            // md breakpoint
            768: {
                slidesPerView: colsMd,
            },
            // lg breakpoint
            1024: {
                slidesPerView: colsLg,
            },
        },
    });

    document.querySelector(".swiper").addEventListener("mouseenter", () => {
        swiper.autoplay.stop();
    });

    document.querySelector(".swiper").addEventListener("mouseleave", () => {
        swiper.autoplay.start();
    });
});
