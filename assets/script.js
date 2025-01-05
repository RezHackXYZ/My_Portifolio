const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const cursor = document.querySelector(".cursor");

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = "white";
});

window.addEventListener("mousemove", function (e) {
  coords.x = e.clientX;
  coords.y = e.clientY;
});

function animateCircles() {
  let x = coords.x;
  let y = coords.y;

  cursor.style.top = x;
  cursor.style.left = y;
  
  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";

    circle.style.scale = (circles.length - index) / circles.length;

    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });

  requestAnimationFrame(animateCircles);
}

animateCircles();


const movementsOfLetters = {
  upAndDown: 100,     // ±100% up/down movement
  leftAndRight: 100,  // ±100% left/right movement
  rotation: 40        // ±40 degrees rotation
};

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const enhanceAllFancy = () => {
document.querySelectorAll(".fancy").forEach(element => {
  const text = element.innerText.split("");
  element.innerText = "";
  const outers = []; 
  
  text.forEach((value, index) => {
    const outer = document.createElement("span");
    outer.className = "outer";
    outers.push(outer);
    
    const inner = document.createElement("span");
    inner.className = "inner";
    inner.style.animationDelay = `${rand(-5000, 0)}ms`;
    
    const letter = document.createElement("span");
    letter.className = "letter";
    letter.innerText = value;
    letter.style.animationDelay = `${index * 1000}ms`;
    
    inner.appendChild(letter);
    outer.appendChild(inner);
    element.appendChild(outer);
  });

  let isHovered = false;
  element.addEventListener("mouseenter", () => {
    if (!isHovered) {
      isHovered = true;
      outers.forEach(outer => {
        const tx = (Math.random() * movementsOfLetters.leftAndRight * 2) - movementsOfLetters.leftAndRight;
        const ty = (Math.random() * movementsOfLetters.upAndDown * 2) - movementsOfLetters.upAndDown;
        const rot = (Math.random() * movementsOfLetters.rotation * 2) - movementsOfLetters.rotation;
        outer.style.transform = `translate(${tx}%, ${ty}%) rotate(${rot}deg)`;
      });
    }
  });

  element.addEventListener("mouseleave", () => {
    isHovered = false;
    outers.forEach(outer => {
      outer.style.transform = "translate(0%, 0%) rotate(0deg)";
    });
  });
});
}
enhanceAllFancy();