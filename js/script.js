/* =========================================
   LANGUAGE SWITCHING
========================================= */

function setLanguage(lang) {

    // Find all elements having data-en and data-hi
    const elements = document.querySelectorAll("[data-en][data-hi]");

    elements.forEach(function (element) {

        if (lang === "hi") {
            element.textContent = element.getAttribute("data-hi");
        } 
        else {
            element.textContent = element.getAttribute("data-en");
        }

    });


    // Change active language button
    const languageButtons = document.querySelectorAll(".language-btn");

    languageButtons.forEach(function (button) {
        button.classList.remove("active");
    });


    if (lang === "hi") {
        languageButtons[1].classList.add("active");
    } 
    else {
        languageButtons[0].classList.add("active");
    }


    // Change HTML language
    document.documentElement.lang = lang;
}


/* =========================================
   THEME SWITCHING
========================================= */
let theme = localStorage.getItem("theme") || "light";

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", function () {

    // Add/remove dark mode
    document.body.classList.toggle("dark-mode");


    // Change icon
    if (document.body.classList.contains("dark-mode")) {
        themeToggle.textContent = "☀";
    } 
    else {
        themeToggle.textContent = "☾";
    }

});

/* =========================================
   MOBILE MENU TOGGLE
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

if (menuToggle && navbar) {

    menuToggle.addEventListener("click", function () {

        navbar.classList.toggle("active");

        const isOpen = navbar.classList.contains("active");

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

    });

}