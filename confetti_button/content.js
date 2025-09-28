const keywords = ["submit", "mark as done", "gönder", "tamamladım"];

function isTargetButton(btn) {
  const text = (btn.innerText || btn.value || "").toLowerCase();
  return keywords.some(kw => text.includes(kw));
}

function attachConfetti(button) {
  if (button.dataset.confettiAttached === "true") return; 
  button.dataset.confettiAttached = "true";

  button.addEventListener("click", () => {
    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    confetti({
      origin: {
        x: x / window.innerWidth,
        y: y / window.innerHeight
      },
      particleCount: 150,
      spread: 80
    });
  });
}

function scanAndAttach() {
  const buttons = document.querySelectorAll("button, input[type='submit'], input[type='button']");
  buttons.forEach(btn => {
    if (isTargetButton(btn)) {
      attachConfetti(btn);
    }
  });
}

scanAndAttach();

const observer = new MutationObserver(() => {
  scanAndAttach();
});
observer.observe(document.body, {
  childList: true,
  subtree: true
});