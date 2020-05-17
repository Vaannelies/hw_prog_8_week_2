class GameObject extends HTMLElement {
    constructor() {
        super(...arguments);
        this.width = this.clientWidth;
        this.height = this.clientHeight;
    }
    hasCollision(gameObject) {
        return (this.x < gameObject.x + gameObject.width &&
            this.x + this.width > gameObject.x &&
            this.y < gameObject.y + gameObject.height &&
            this.y + this.height > gameObject.y);
    }
    move() {
    }
    draw() {
        this.style.transform = `translate(${this.x}px,${this.y}px)`;
    }
}
class Wheel extends GameObject {
    constructor(car, offsetCarX) {
        super();
        this.style.transform = `translate(${offsetCarX}px, 30px)`;
        car.appendChild(this);
    }
    move() {
    }
    onCollision() {
    }
}
window.customElements.define("wheel-component", Wheel);
class Car extends GameObject {
    constructor(yIndex, game) {
        super();
        this.speed = Math.random() * 2 + 1;
        this.braking = false;
        this.stopped = false;
        this.game = game;
        this.x = 0;
        this.y = (70 * yIndex) + 80;
        new Wheel(this, 105);
        new Wheel(this, 20);
        document.addEventListener("keydown", (e) => this.handleKeyDown(e));
        this.addEventListener("click", (e) => this.handleMouseClick(e));
        let parent = document.getElementById("container");
        parent.appendChild(this);
    }
    handleMouseClick(e) {
        this.braking = true;
        this.changeColor(80);
    }
    handleKeyDown(e) {
        if (e.key == ' ') {
            this.braking = true;
        }
    }
    move() {
        this.x += this.speed;
        if (this.braking)
            this.speed *= 0.98;
        if (this.speed < 0.5)
            this.speed = 0;
        if (this.speed == 0 && this.braking && !this.stopped) {
            this.changeColor(80);
            this.braking = false;
            this.stopped = true;
        }
        this.draw();
    }
    onCollision() {
        this.crash();
    }
    crash() {
        this.speed = 0;
        this.braking = false;
        this.changeColor(300);
    }
    changeColor(deg) {
        this.style.filter = `hue-rotate(${deg}deg)`;
    }
}
window.customElements.define("car-component", Car);
class Game {
    constructor() {
        this.score = 0;
        this.request = 0;
        this.gameObjects = [];
        this.gameover = false;
        for (let i = 0; i < 6; i++) {
            this.gameObjects.push(new Car(i, this));
            this.gameObjects.push(new Rock(i));
        }
        document.getElementById("score").innerHTML = "Score : " + this.score;
        this.gameLoop();
    }
    gameLoop() {
        for (let gameObject of this.gameObjects) {
            gameObject.move();
        }
        this.checkCollision();
        this.request = requestAnimationFrame(() => this.gameLoop());
    }
    checkCollision() {
        for (let gameObject of this.gameObjects) {
            if (gameObject instanceof Car || gameObject instanceof Rock) {
                if (gameObject.hasCollision(gameObject)) {
                    gameObject.onCollision();
                    this.gameOver();
                }
            }
        }
    }
    gameOver() {
        this.gameover = true;
        document.getElementById("score").innerHTML = "Game Over";
        cancelAnimationFrame(this.request);
    }
    addScore(x) {
        if (!this.gameover) {
            this.score += Math.floor(x);
            document.getElementById("score").innerHTML = "Score : " + this.score;
        }
    }
}
window.addEventListener("load", () => new Game());
class Rock extends GameObject {
    constructor(index) {
        super();
        this.speed = 0;
        this.g = 0;
        this.rotation = 0;
        this.rotationSpeed = 0;
        this.x = Math.random() * 400 + 400;
        this.y = (70 * index) + 80;
        let parent = document.getElementById("container");
        parent.appendChild(this);
    }
    move() {
        this.x += this.speed;
        this.y += this.g;
        this.speed *= 0.98;
        this.rotation += this.rotationSpeed;
        if (this.y + this.clientHeight > document.getElementById("container").clientHeight) {
            this.speed = 0;
            this.g = 0;
            this.rotationSpeed = 0;
        }
        this.draw();
    }
    onCollision() {
        this.crash();
    }
    crash() {
        this.g = 9.81;
        this.speed = 0;
        this.rotationSpeed = 5;
    }
}
window.customElements.define("rock-component", Rock);
//# sourceMappingURL=main.js.map