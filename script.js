const particles = [];

//p5.js
function setup() {
  const canvas = createCanvas(window.innerWidth, window.innerHeight);
  canvas.parent("canvasForHTML");
  const particlesLength = Math.floor(window.innerWidth / 10);

  for (let i = 0; i < particlesLength; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  clear();
  particles.forEach((p, index) => {
    p.update();
    p.draw();
    p.checkParticles(particles.slice(index));
  });
}

class Particle {
  constructor() {
    this.size = 10;
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(random(-1.8, 1.8), random(-1.8, 1.8));
  }

  // draw particle
  draw() {
    noStroke();
    fill("rgba(255,255,255,0.2)");
    circle(this.pos.x, this.pos.y, this.size);
  }

  //update movement
  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.edges();
  }

  // Detect edges
  edges() {
    if (this.pos.x < 0 || this.pos.x > width) {
      this.vel.x *= -1;
    }

    if (this.pos.y < 0 || this.pos.y > height) {
      this.vel.y *= -1;
    }
  }

  //connect particles
  checkParticles(particles) {
    particles.forEach((particle) => {
      const d = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
      if (d < 120) {
        stroke("rgba(255,255,255,0.1)");
        line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
      }
    });
  }
}
