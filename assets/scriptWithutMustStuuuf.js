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

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let interval = null;

// Only apply to elements with the class 'hackerText'
document.querySelectorAll(".hackerText").forEach(element => {
  element.onmouseover = event => {
    let iteration = 0;

    clearInterval(interval);

    interval = setInterval(() => {
      event.target.innerText = event.target.innerText
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return event.target.dataset.value[index];
          }

          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      if (iteration >= event.target.dataset.value.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);
  };
});


const handleOnMove = e => {
  const mousePosition = { x: e.clientX, y: e.clientY }
  
  const now = new Date().getTime(),
        hasMovedFarEnough = calcDistance(last.starPosition, mousePosition) >= config.minimumDistanceBetweenStars,
        hasBeenLongEnough = calcElapsedTime(last.starTimestamp, now) > config.minimumTimeBetweenStars;
  
  if(hasMovedFarEnough || hasBeenLongEnough) {
    createStar(mousePosition);
    last.starTimestamp = now;
    last.starPosition = mousePosition;
  }
  last.mousePosition = mousePosition;
}

window.onmousemove = handleOnMove;
window.ontouchmove = e => handleOnMove(e.touches[0]);
document.body.onmouseleave = () => last.mousePosition = originPosition;
const movementsOfLetters = {
  upAndDown: 35,
  leftAndRight: 35,
  rotation: 35
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
      inner.style.animationDelay = `${rand(-1000, 0)}ms`;  // Faster random start

      const letter = document.createElement("span");
      letter.className = "letter";

      if (value === " ") {
        letter.innerHTML = "&nbsp;";
        letter.classList.add("space");
      } else {
        letter.innerText = value;
      }

      // Reduce delay to 100ms per letter
      letter.style.animationDelay = `${index * 100}ms`;

      inner.appendChild(letter);
      outer.appendChild(inner);
      element.appendChild(outer);
    });

    element.addEventListener("mouseenter", () => {
      outers.forEach(outer => {
        const tx = (Math.random() * movementsOfLetters.leftAndRight * 2) - movementsOfLetters.leftAndRight;
        const ty = (Math.random() * movementsOfLetters.upAndDown * 2) - movementsOfLetters.upAndDown;
        const rot = (Math.random() * movementsOfLetters.rotation * 2) - movementsOfLetters.rotation;

        outer.style.transition = "transform 0.3s ease-in-out";  // Faster hover effect
        outer.style.transform = `translate(${tx}%, ${ty}%) rotate(${rot}deg)`;
      });
    });

    element.addEventListener("mouseleave", () => {
      outers.forEach(outer => {
        outer.style.transition = "transform 0.3s ease-in-out";  // Faster reset
        outer.style.transform = "translate(0%, 0%) rotate(0deg)";
      });
    });
  });
};

enhanceAllFancy();

const container = document.getElementById('projectsBigBiiContainor');

        for (let key in ConfigForProjectsInHtml) {
            const project = ConfigForProjectsInHtml[key];
            const projectCard = `
                <div class="project-card">
                    <img src="${project.image}" alt="${project.Titel}">
                    <div class="project-content">
                        <h3>${project.Titel}</h3>
                        <p>${project.discription}</p>
                        <a href="${project.link}" target="_blank">View Project</a>
                    </div>
                </div>
            `;
            container.innerHTML += projectCard;
        }