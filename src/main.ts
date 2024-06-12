import "./style.css";
import { Game } from "./game";

document.addEventListener("DOMContentLoaded", () => {
  const startPage = document.getElementById("startPage")!;
  const startButton = document.getElementById("startButton")!;
  const gameCanvas = document.getElementById("gameCanvas") as HTMLCanvasElement;

  gameCanvas.style.display = "none";

  startButton.addEventListener("click", () => {
    startPage.style.display = "none";
    gameCanvas.style.display = "block";
    new Game();
  });
});
