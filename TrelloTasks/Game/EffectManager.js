export default class EffectManager {
  static applyHurtEffect(targetId) {
    const targetImg = document.getElementById(targetId);

    if (targetImg) {
      targetImg.classList.add("hurt-effect");

      setTimeout(() => {
        targetImg.classList.remove("hurt-effect");
      }, 300);
    }
  }
}
