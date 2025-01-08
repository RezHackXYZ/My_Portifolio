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

  const cardContainer = document.querySelector('.card-container');
  let isDragging = false;
  let startX = 0;
  let currentX = 0;

  const cards = [
    document.getElementById('card1'),
    document.getElementById('card2'),
    document.getElementById('card3')
  ];

  let activeCard = cards[0];

  cards.forEach(card => {
    card.addEventListener('mousedown', (e) => {
      if (card !== activeCard) return;  // Prevent dragging lower cards
      isDragging = true;
      startX = e.clientX;
    });
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    currentX = e.clientX - startX;
    activeCard.style.transform = `translateX(${currentX}px) rotate(-5deg)`;
  });

  document.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    activeCard.style.transition = 'transform 0.3s ease';
    activeCard.style.transform = 'translateX(200px) rotate(5deg)';
    activeCard.style.width = '80%';
    activeCard.style.height = '80%';
    activeCard.style.zIndex = '1';

    cards[1].style.transition = 'transform 0.3s ease';
    cards[1].style.transform = 'rotate(-5deg)';
    cards[1].style.width = '100%';
    cards[1].style.height = '100%';
    cards[1].style.zIndex = '3';

    cards[2].style.transition = 'transform 0.3s ease';
    cards[2].style.transform = 'translateX(100px) rotate(0deg)';
    cards[2].style.width = '90%';
    cards[2].style.height = '90%';
    cards[2].style.zIndex = '2';

    // Cycle the cards
    setTimeout(() => {
      cardContainer.appendChild(activeCard);
      cards.push(cards.shift());
      activeCard = cards[0];
    }, 300);
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

// Define cardss array
const cardss = [
  document.getElementById('card1'),
  document.getElementById('card2'),
  document.getElementById('card3')
];

// Function to get 3 random projects from the config
function getRandomProjects(config, count = 3) {
  const keys = Object.keys(config);
  const randomProjects = [];
  while (randomProjects.length < count) {
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    if (!randomProjects.includes(config[randomKey])) {
      randomProjects.push(config[randomKey]);
    }
  }
  return randomProjects;
}

// Function to populate the cardss with project details
function populatecardss(cardss, projects) {
  cardss.forEach((card, index) => {
    const project = projects[index];
    card.innerHTML = `
      <img src="${project.image}" alt="${project.Titel}" style="width: 100%; height: auto; border-radius: 10px;">
      <h2>${project.Titel}</h2>
      <p>${project.discription}</p>
      <a href="${project.link}" target="_blank"><button class="buttonOfCard">View Project</button></a>
    `;
  });
}

// Get random projects and populate the cardss
const projectsConfig = ConfigForProjectsInHtml;
const randomProjects = getRandomProjects(projectsConfig);
populatecardss(cardss, randomProjects);

