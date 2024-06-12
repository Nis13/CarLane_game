export class OpponentCar {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  x: number;
  y: number;
  width: number;
  height: number;
  image: HTMLImageElement;
  isVisible: boolean;

  constructor(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    width: number,
    height: number,
    imageSrc: string,
    x = 0,
    y = 0
  ) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = imageSrc;
    this.isVisible = true;
    this.resetPosition();
  }

  drawCar() {
    if (this.isVisible) {
      this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }

  update(speed: number) {
    this.y += speed;
  }

  hide() {
    this.isVisible = false;
  }

  show() {
    this.isVisible = true;
  }

  resetPosition() {
    this.y = -this.height;
    this.x = this.randomXPosition();
  }

  randomXPosition() {
    const laneWidth = this.canvas.width / 3;
    const lane = Math.floor(Math.random() * 3);
    return lane * laneWidth + (laneWidth - this.width) / 2;
  }
}
