const savedTheme = localStorage.getItem("theme") || "light";
const savedLang = localStorage.getItem("language") || "en";

function setLanguage(lang) {
    localStorage.setItem("language", lang);
    document.querySelectorAll("[data-en][data-hi]").forEach(el => {
        el.textContent = el.dataset[lang];
    });
    document.documentElement.lang = lang;
    document.querySelectorAll(".language-btn").forEach(btn =>
        btn.classList.remove("active")
    );
    document.querySelector(
        `.language-btn[onclick="setLanguage('${lang}')"]`
    )?.classList.add("active");
}

function setTheme(theme) {
    document.body.classList.toggle("dark-mode", theme === "dark");
    localStorage.setItem("theme", theme);

    const btn = document.getElementById("themeToggle");
    if (btn) btn.textContent = theme === "dark" ? "☀" : "☾";
}

setLanguage(savedLang);
setTheme(savedTheme);

document.getElementById("themeToggle")?.addEventListener("click", () => {
    setTheme(document.body.classList.contains("dark-mode") ? "light" : "dark");
});


/* Mobile Menu */
const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

menuToggle?.addEventListener("click", () => {
    navbar?.classList.toggle("active");
});
