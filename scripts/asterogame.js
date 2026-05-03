//Init
const canvas = document.getElementById('theCanvas');
const ctx = canvas.getContext('2d');
let gauche = false;
let droite = false;

// 1. État du jeu
const vaisseau = { x: 400, y: 500, largeur: 40, hauteur: 40 };
const asteroides = [];

//life
let life = 3;

//user status
let etatJeu = "playing"; // "playing" | "gameover"

//Afficher les coeurs
const heartPlace = document.getElementById('heart-place');

//create Breakframe
let animationFrameId;

//Pause button
let isPaused = false;
const pauseButton = document.getElementById('pause-button');
const pauseImage = document.getElementById('pause-image');

//Popup pause
const pausePopup = document.querySelector('.pause-popup');
pausePopup.style.display = 'none';
const resumeButton = document.getElementById('resume-button');
const leaveButton = document.getElementById('leave-button');

//Control
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') gauche = true;
  if (e.key === 'ArrowRight') droite = true;
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowLeft') gauche = false;
  if (e.key === 'ArrowRight') droite = false;
});

// 2. Update — logique pure, pas de dessin ici
function update() {

    //Detecte l' etat de l'user
    if (etatJeu !== "playing") return;

    // déplacer les astéroïdes, vérifier collisions...
    if (gauche) vaisseau.x -= 5;
    if (droite) vaisseau.x += 5;

    // spawn aléatoire
    if (Math.random() < 0.02) {
    creerAsteroide();
    }

    // déplacement
    asteroides.forEach(a => {
    a.y += a.vitesse;
    });

    //collision
    asteroides.forEach(a => {
    if (collision(vaisseau, a)) {
        life = life - 1;
        if (life <= 0) {
            etatJeu = "gameover";
            window.location.href ='./gameover.html';
        }
        // Réinitialiser le vaisseau et les astéroïdes
        vaisseau.x = 400;
        vaisseau.y = 500;
        asteroides.length = 0;
    }
    });

    //Afficher les coeurs
    heartPlace.innerHTML = '';
    for (let i = 0; i < life; i++) {
        const heart = document.createElement('img');
        heart.src = './assets/icons/heart.png';
        heart.classList.add('heart-icon');
        heartPlace.appendChild(heart);
    }
}

// 3. Draw — dessin pur, pas de logique ici
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // vaisseau
  ctx.fillStyle = 'blue';
  ctx.fillRect(vaisseau.x, vaisseau.y, vaisseau.largeur, vaisseau.hauteur);

  //asteroide
  asteroides.forEach(a => {
  ctx.fillStyle = 'red';
  ctx.fillRect(a.x, a.y, a.taille, a.taille);
    });
}

function creerAsteroide() {
  asteroides.push({
    x: Math.random() * canvas.width,
    y: 0,
    taille: 20 + Math.random() * 30,
    vitesse: 2 + Math.random() * 3
  });
}

function collision(a, b) {
  return (
    a.x < b.x + b.taille &&
    a.x + a.largeur > b.x &&
    a.y < b.y + b.taille &&
    a.y + a.hauteur > b.y
  );
}

// 4. Loop
function loop() {
  update();
  draw();
  animationFrameId = requestAnimationFrame(loop);
}

//Lunch the game
animationFrameId = loop();

pauseButton.addEventListener('click', () => {
  if (isPaused) {
    animationFrameId = loop();
  } else {
    cancelAnimationFrame(animationFrameId);
    pauseButton.disabled = true;
    pauseImage.classList.add('paused');
    pausePopup.style.display == 'none' ? pausePopup.style.display = 'block' : pausePopup.style.display = 'none';
  }
  isPaused = !isPaused;
});

resumeButton.addEventListener('click', () => {
  if (isPaused) {
    animationFrameId = loop();
    pausePopup.style.display = 'none';
  }
  isPaused = !isPaused;
  pauseButton.disabled = false;
  pauseImage.classList.remove('paused');
});

leaveButton.addEventListener('click', () => {
  window.location.href ='./index.html';
});