"use strict";


// DOM Element Selection
const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");
const mobileMenuContainer = document.getElementById("mobile-menu-container");
const mobileMenuClose = document.getElementById("close-button");
const preLoader = document.querySelector(".preload-container");
const sections = document.querySelectorAll(".section");
const servicesItem = document.querySelectorAll(".service-card");
const servicesContents = document.querySelector(".services-contents");
const servicesMoreButton = document.querySelector(".services-more");
const aElement = document.querySelectorAll("a");

// PreLoader
window.addEventListener("load", function(){
    this.setTimeout(function(){
        preLoader.classList.add("preload-hidden");
    }, 2000);
    this.setTimeout(function(){
        preLoader.remove();
    }, 3000);
});


// Mobile Menu Handler
const mobileMenuShow = function() {
    mobileMenuOverlay.classList.remove("hidden");
    mobileMenuContainer.style.left = "0px";
};
const mobileMenuHidden = function() {
    mobileMenuOverlay.classList.add("hidden");
    mobileMenuContainer.style.left = "-320px";
};
mobileMenuToggle.addEventListener("click", mobileMenuShow);
mobileMenuOverlay.addEventListener("click", mobileMenuHidden);
mobileMenuClose.addEventListener("click", mobileMenuHidden);


// SwiperJS
const swiperTestimonial = new Swiper('.swiper-1', {
    direction: 'horizontal',
    loop: true,
    autoplay: {
        delay: 2000,
        pauseOnMouseEnter: true,
    },
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

// Blog section removed — swiper-2 no longer needed


// Services Fade Animation removed as requested
// Section fade in Animation
sections.forEach(function(param) {
    param.classList.add("section-fade");
});
const sectionEffectCallback = function(entries) {
    const [entry] = entries;
    if (entry.isIntersecting) {
        entry.target.classList.remove("section-fade");
        sectionEffect.unobserve(entry.target);
    };
};
const sectionEffect = new IntersectionObserver(sectionEffectCallback, {
    root: null,
    threshold: 0,
});
sections.forEach(function(param) {
    sectionEffect.observe(param);
});


// <a> Element PreventDefault for placeholders
aElement.forEach(function(item){
    item.addEventListener("click", function(e){
        const href = item.getAttribute("href");
        if (href === "#" || !href) {
            e.preventDefault();
        }
    });
});


// Audit Fix #2: Nav Active State via IntersectionObserver
const navSections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll("nav a[href^='#']");

const setActiveNav = (id) => {
    navLinks.forEach(link => {
        link.classList.remove("nav-active");
        if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("nav-active");
        }
    });
};

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setActiveNav(entry.target.id);
        }
    });
}, { root: null, threshold: 0.3 });

navSections.forEach(section => navObserver.observe(section));


// Audit Fix #11: Contact Form Inline Validation
const contactForm = document.querySelector("form");
if (contactForm) {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");

    const showError = (input, errorEl) => {
        input.classList.add("input-error");
        if (errorEl) errorEl.classList.add("visible");
    };
    const clearError = (input, errorEl) => {
        input.classList.remove("input-error");
        if (errorEl) errorEl.classList.remove("visible");
    };

    if (nameInput) {
        nameInput.addEventListener("blur", () => {
            nameInput.value.trim().length < 2 ? showError(nameInput, nameError) : clearError(nameInput, nameError);
        });
        nameInput.addEventListener("input", () => clearError(nameInput, nameError));
    }
    if (emailInput) {
        emailInput.addEventListener("blur", () => {
            const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
            valid ? clearError(emailInput, emailError) : showError(emailInput, emailError);
        });
        emailInput.addEventListener("input", () => clearError(emailInput, emailError));
    }

    contactForm.addEventListener("submit", (e) => {
        let hasError = false;
        if (nameInput && nameInput.value.trim().length < 2) {
            showError(nameInput, nameError); hasError = true;
        }
        if (emailInput) {
            const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
            if (!valid) { showError(emailInput, emailError); hasError = true; }
        }
        if (hasError) {
            e.preventDefault();
            document.querySelector(".input-error")?.focus();
        }
    });
}