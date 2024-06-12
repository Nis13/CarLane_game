export class PlayerCar {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  x: number;
  y: number;
  width: number;
  height: number;
  image: HTMLImageElement;

  constructor(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    x: number,
    y: number,
    width: number,
    height: number,
    imageSrc: string
  ) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = imageSrc;
  }

  drawCar() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  moveLeft() {
    if (this.x > this.canvas.width / 3 - this.width / 2) {
      this.x -= this.canvas.width / 3;
    }
  }

  moveRight() {
    if (this.x < (this.canvas.width / 3) * 2 - this.width / 2) {
      this.x += this.canvas.width / 3;
    }
  }

  resetPosition() {
    this.x = this.canvas.width / 2 - this.width / 2;
    this.y = this.canvas.height - this.height;
  }
}
