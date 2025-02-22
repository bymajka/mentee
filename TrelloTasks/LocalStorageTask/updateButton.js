export default function updateButton(buttonEl, isDark) {
  const newCta = isDark ? "Change to light mode" : "Change to dark mode";
  buttonEl.setAttribute("aria-label", newCta);
  buttonEl.innerText = newCta;
}
