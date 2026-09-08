import confetti from "canvas-confetti";

export function fireHeartConfetti() {
  const scalar = 2;
  const heart = confetti.shapeFromText({ text: "❤️", scalar });

  const defaults = {
    spread: 360,
    ticks: 60,
    gravity: 0,
    decay: 0.96,
    startVelocity: 20,
    shapes: [heart],
    scalar,
    origin: { x: 0.5, y: 0.5 },
    zIndex: 9999,
  };

  const shoot = () => {
    confetti({
      ...defaults,
      particleCount: 30,
    });

    confetti({
      ...defaults,
      particleCount: 5,
    });

    confetti({
      ...defaults,
      particleCount: 15,
      scalar: scalar / 2,
      shapes: ["circle"],
    });
  };

  window.setTimeout(shoot, 0);
  window.setTimeout(shoot, 100);
  window.setTimeout(shoot, 200);
}
