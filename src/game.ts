import { CANVAS_DIMENSIONS, SPEED } from "./constants";
import { highway } from "./highway";
import { PlayerCar } from "./playerCar";
import { OpponentCar } from "./opponentCar";

export class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  playerCar: PlayerCar;
  opponentCars: OpponentCar[];
  animationId: number;
  highwayHeight: number;
  gameoverFlag: boolean;
  score: number;
  enemyCarSpeed: number;
  counter: number;
  spawnInterval: number;
  spawnIntervalId: number | undefined;

  constructor() {
    this.canvas = document.querySelector<HTMLCanvasElement>("#gameCanvas")!;
    this.ctx = this.canvas.getContext("2d")!;
    this.canvas.height = CANVAS_DIMENSIONS.CANVAS_HEIGHT;
    this.canvas.width = CANVAS_DIMENSIONS.CANVAS_WIDTH;

    this.highwayHeight = this.canvas.height / 3;

    const carWidth = this.canvas.width / 6;
    const carHeight = this.canvas.height / 4;

    const playerCarImageSrc = "./public/player-car.png";

    this.gameoverFlag = false;
    this.animationId = 0;
    this.score = 0;
    this.enemyCarSpeed = SPEED;
    this.counter = 0;
    this.spawnInterval = 3000;

    this.playerCar = new PlayerCar(
      this.ctx,
      this.canvas,
      this.canvas.width / 2 - carWidth / 2,
      this.canvas.height - carHeight,
      carWidth,
      carHeight,
      playerCarImageSrc
    );

    this.opponentCars = [];

    this.init();
  }

  init() {
    this.highwayHeight = this.canvas.height / 3;
    this.gameoverFlag = false;
    window.addEventListener("keydown", this.onKeyDown.bind(this));
    this.animationId = requestAnimationFrame(this.draw);
    this.spawnIntervalId = setInterval(
      this.spawnOpponentCar.bind(this),
      this.spawnInterval
    );
  }

  draw = () => {
    if (this.gameoverFlag) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.playerCar.drawCar();

    this.opponentCars.forEach((car) => {
      const carPassed = car.y > this.canvas.height;
      car.update(this.enemyCarSpeed);
      car.drawCar();

      if (
        this.playerCar.x < car.x + car.width &&
        this.playerCar.x + this.playerCar.width > car.x &&
        this.playerCar.y < car.y + car.height &&
        this.playerCar.y + this.playerCar.height > car.y
      ) {
        console.log("Collision detected!");
        this.gameover();
      }

      if (carPassed) {
        this.score += 10;
        car.resetPosition();
      }
    });

    highway(this.ctx, this.highwayHeight, this.canvas);
    this.highwayHeight += SPEED;
    this.displayScore();
    this.increaseDifficulty();

    this.animationId = requestAnimationFrame(this.draw);
  };

  displayScore() {
    if (!this.gameoverFlag) {
      this.ctx.fillStyle = "white";
      this.ctx.font = "20px Arial";
      this.ctx.fillText(`Score: ${this.score}`, 50, 30);
    }
  }

  increaseDifficulty() {
    this.counter++;
    if (this.counter == 2000) {
      this.enemyCarSpeed += 1;
    }
    if (this.counter == 4000) {
      this.enemyCarSpeed += 2;
    }
    if (this.counter == 8000) {
      this.enemyCarSpeed += 4;
    }
    if (this.counter == 10000) {
      this.enemyCarSpeed += 5;
    }
  }
  spawnOpponentCar() {
    const carWidth = this.canvas.width / 6;
    const carHeight = this.canvas.height / 4;
    const opponentCarImageSrc = "./public/opponent-car.png";

    const minDistanceBetweenCars = carHeight + this.playerCar.height;

    if (
      this.opponentCars.length === 0 ||
      this.opponentCars[this.opponentCars.length - 1].y >
        this.canvas.height - minDistanceBetweenCars
    ) {
      const newCar = new OpponentCar(
        this.ctx,
        this.canvas,
        carWidth,
        carHeight,
        opponentCarImageSrc
      );

      newCar.x = newCar.randomXPosition();
      newCar.y = -carHeight;

      this.opponentCars.push(newCar);
    }
  }
  gameover() {
    this.gameoverFlag = true;
    cancelAnimationFrame(this.animationId);
    if (this.spawnIntervalId) {
      clearInterval(this.spawnIntervalId);
    }
    this.opponentCars.forEach((car) => car.hide());

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    const gameOverWidth = this.canvas.width;
    const gameOverHeight = this.canvas.height / 2;
    const gameOverX = (this.canvas.width - gameOverWidth) / 2;
    const gameOverY = (this.canvas.height - gameOverHeight) / 2;

    this.ctx.fillStyle = "white";
    this.ctx.fillRect(gameOverX, gameOverY, gameOverWidth, gameOverHeight);
    this.ctx.strokeStyle = "black";
    this.ctx.strokeRect(gameOverX, gameOverY, gameOverWidth, gameOverHeight);

    this.ctx.fillStyle = "black";
    this.ctx.font = "bold 36px Arial";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(
      "Game Over",
      this.canvas.width / 2,
      this.canvas.height / 2
    );

    this.ctx.font = "24px Arial";
    this.ctx.fillText(
      `Score: ${this.score}`,
      this.canvas.width / 2,
      this.canvas.height / 2 + 50
    );

    this.ctx.font = "20px Arial";
    this.ctx.fillText(
      "Press Space to start",
      this.canvas.width / 2,
      this.canvas.height / 2 + 100
    );
    this.ctx.fillText(
      "the game",
      this.canvas.width / 2,
      this.canvas.height / 2 + 150
    );
  }

  onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case "ArrowLeft":
      case "a":
        this.playerCar.moveLeft();
        break;
      case "ArrowRight":
      case "d":
        this.playerCar.moveRight();
        break;
      case " ":
        if (this.gameoverFlag) {
          this.restart();
        }
        break;
    }
  }

  restart() {
    this.gameoverFlag = false;
    this.score = 0;
    this.counter = 0;
    this.enemyCarSpeed = SPEED;
    this.playerCar.resetPosition();
    this.highwayHeight = this.canvas.height / 3;

    this.opponentCars = [];
    this.spawnIntervalId = setInterval(
      this.spawnOpponentCar.bind(this),
      this.spawnInterval
    );

    this.animationId = requestAnimationFrame(this.draw);
  }
}
