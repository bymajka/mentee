import calculateSettingsAsThemeString from "./calculateSettingsAsThemeString.js";
import updateButton from "./updateButton.js";
import updateThemeOnHtmlEl from "./updateThemeOnHtmlEl.js";

const button = document.querySelector("[data-theme-toggle]");

const toggleButton = document.querySelector("[data-theme-toggle]");
const localStorageTheme = localStorage.getItem("theme");
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

let currentThemeSettings = calculateSettingsAsThemeString(
  localStorageTheme,
  systemSettingDark
);

updateButton(button, currentThemeSettings === "dark");
updateThemeOnHtmlEl(currentThemeSettings);

button.addEventListener("click", () => {
  const newTheme = currentThemeSettings === "dark" ? "light" : "dark";

  localStorage.setItem("theme", newTheme);
  updateButton(button, newTheme === "dark");
  updateThemeOnHtmlEl(newTheme);

  currentThemeSettings = newTheme;
});

window.addEventListener("storage", (event) => {
  if (event.key === "theme") {
    const newTheme = event.newValue;
    updateButton(button, newTheme === "dark");
    updateThemeOnHtmlEl(newTheme);
    currentThemeSettings = newTheme;
  }
});
