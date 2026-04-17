//Init
const canvas = document.getElementById('theCanvas');
const ctx = canvas.getContext('2d');
let gauche = false;
let droite = false;

// 1. État du jeu
const vaisseau = { x: 400, y: 500, largeur: 40, hauteur: 40 };
const asteroides = [];

//user status
let etatJeu = "playing"; // "playing" | "gameover"

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
        etatJeu = "gameover";
        if(!confirm("Would you restart the game ?")){
            
            window.location.href ='./hub.html';
        }
    }
    });
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
  requestAnimationFrame(loop);
}

//Lunch the game
loop();