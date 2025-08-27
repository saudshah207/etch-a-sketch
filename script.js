function setUpEtchASketch(
  grid = document.querySelector(".container"),
  squaresPerSide = 16,
  configureGridButton = document.querySelector(".configure-squares"),
  randomColorsToggle = document.querySelector(".random-colors-toggle"),
  resetButton = document.querySelector(".reset")
) {
  const divsAmountToCreate = squaresPerSide * squaresPerSide;
  let isRandomColorsOn = false;

  async function createDivs(divsCount) {
    let div, fragment;

    fragment = document.createDocumentFragment();

    for (let index = 0; index < divsCount; index++) {
      div = document.createElement("div");
      div.className = "square";
      fragment.append(div);
    }

    grid.append(fragment);
  }

  createDivs(divsAmountToCreate);

  function createGrid() {
    grid = document.createElement("div");
    grid.className = "container";
    document.body.append(grid);

    return grid;
  }

  grid.addEventListener("mouseover", changeDivBg);

  function changeDivBg(event) {
    const target = event.target;

    if (isRandomColorsOn && target.dataset.turnedToBlack)
      delete target.dataset.turnedToBlack;

    const turnedToBlack = target.dataset.turnedToBlack;

    if (target.classList.contains("square") && !turnedToBlack) {
      if (!isRandomColorsOn) {
        target.dataset.turnedToBlack = true;
        target.classList.add("turn-to-black");
        target.style = "";

        return;
      }

      target.style.backgroundColor = getRandomColor(256);
    }
  }

  configureGridButton.addEventListener("click", askUserForGridSquaresPerSide);

  function askUserForGridSquaresPerSide() {
    const maxSquaresPerSide = 100;

    do {
      squaresPerSide = +prompt(
        `How many squares per side do you want? (max we can do is ${maxSquaresPerSide})`,
        "16"
      );
    } while (squaresPerSide > maxSquaresPerSide);

    if (squaresPerSide) {
      resetEtchASketch(squaresPerSide);
    } else console.log("user either cancelled or gave invalid input");
  }

  randomColorsToggle.addEventListener("click", toggleRandomColors);

  function toggleRandomColors() {
    isRandomColorsOn = isRandomColorsOn ? false : true;

    function updateToggleText() {
      const toggleTextIndication = isRandomColorsOn ? "Off" : "On";

      randomColorsToggle.textContent = `Turn ${toggleTextIndication} Random Colors`;
    }

    updateToggleText();
  }

  function getRandomColor(exclusiveUpToNumber) {
    function getRandomNumber(exclusiveUpTo) {
      return Math.floor(Math.random() * exclusiveUpTo);
    }

    return `rgb(${getRandomNumber(exclusiveUpToNumber)},
      ${getRandomNumber(exclusiveUpToNumber)},
      ${getRandomNumber(exclusiveUpToNumber)})`;
  }

  resetButton.addEventListener("click", () => resetEtchASketch());

  function resetEtchASketch(squaresPerSide = 16) {
    grid.remove();
    grid = createGrid();

    grid.addEventListener("mouseover", changeDivBg);

    document.firstElementChild.style = `--grid-squares-per-side: ${squaresPerSide};`;

    createDivs(squaresPerSide * squaresPerSide);
  }
}

setUpEtchASketch(
  document.querySelector(".container"),
  16,
  document.querySelector(".configure-squares"),
  document.querySelector(".random-colors-toggle"),
  document.querySelector(".reset")
);
