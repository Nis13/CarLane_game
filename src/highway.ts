export function highway(
  ctx: CanvasRenderingContext2D,
  height: number,
  canvas: HTMLCanvasElement
) {
  ctx.fillStyle = "white";

  ctx.fillRect(canvas.width / 3, height % canvas.height, 20, 90);
  ctx.fillRect((2 * canvas.width) / 3, height % canvas.height, 20, 90);
  ctx.fillRect(
    canvas.width / 3,
    (height + canvas.height / 2) % canvas.height,
    20,
    90
  );
  ctx.fillRect(
    (2 * canvas.width) / 3,
    (height + canvas.height / 2) % canvas.height,
    20,
    90
  );
}
