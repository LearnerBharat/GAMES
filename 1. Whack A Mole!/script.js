window.onload = function () {
  setGame();
};

let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;

function setGame() {
  for (let i = 0; i < 9; i++) {
    let tile = document.createElement("div");
    tile.id = i.toString();
    tile.addEventListener("click", selectTile);
    document.getElementById("board").appendChild(tile);
  }

  setInterval(setMole, 1000);
  setInterval(setPlant, 2000);
}

function getRandomTile() {
  let num = Math.floor(Math.random() * 9);
  return num.toString();
}

function setMole() {
  if (gameOver) {
    return;
  }

  if (currMoleTile) {
    currMoleTile.innerHTML = "";
  }

  let mole = document.createElement("img");
  mole.src = "./images/monty-mole.png";

  let num = getRandomTile();

  if (currPlantTile && currPlantTile.id == num) {
    return;
  }

  currMoleTile = document.getElementById(num);
  currMoleTile.appendChild(mole);
}

function setPlant() {
  if (gameOver) {
    return;
  }

  if (currPlantTile) {
    currPlantTile.innerHTML = "";
  }

  let plant = document.createElement("img");
  plant.src = "./images/piranha-plant.png";

  let num = getRandomTile();

  if (currMoleTile && currMoleTile.id == num) {
    return;
  }

  currPlantTile = document.getElementById(num);
  currPlantTile.appendChild(plant);
}

function selectTile() {
  if (gameOver) {
    return;
  }

  if (this == currMoleTile) {
    // 'this' refers to the tile that is clicked
    score += 10;
    document.getElementById("score").innerText = "POINTS: " + score.toString();
  } else if (this == currPlantTile) {
    document.getElementById("score").innerText =
      "GAME OVER: " + score.toString();
    gameOver = true;
  }
}
