export default function updateThemeOnHtmlEl(theme) {
  document.querySelector("html").setAttribute("data-theme", theme);
}
