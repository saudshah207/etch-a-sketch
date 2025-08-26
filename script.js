function setUpEtchASketch(
  grid = document.querySelector(".container"),
  squaresPerSide = 16,
  configureGridButton = document.querySelector(".configure-squares")
) {
  const divsAmountToCreate = squaresPerSide * squaresPerSide;

  async function createDivs(divsCount) {
    let div, fragment;

    fragment = document.createDocumentFragment();

    for (let index = 0; index < divsCount; index++) {
      div = document.createElement("div");
      div.className = "square";
      fragment.append(div);
    }

    grid.append(fragment);

    console.log("grid width x height is", grid.clientWidth, "x", grid.clientHeight);
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
    const target = event.target,
      turnedToBlack = target.dataset.turnedToBlack;

    if (target.classList.contains("square") && !turnedToBlack) {
      target.dataset.turnedToBlack = true;

      target.classList.add("turn-to-black");
    }
  }

  configureGridButton.addEventListener("click", askUserForGridSquaresPerSide);

  function askUserForGridSquaresPerSide() {
    const maxSquaresPerSide = 100;

    let squaresPerSide;
    do {
      squaresPerSide = +prompt(
        `How many squares per side do you want? (max we can do is ${maxSquaresPerSide})`,
        "16"
      );
      console.log(squaresPerSide);
    } while (squaresPerSide > maxSquaresPerSide);

    if (squaresPerSide) {
      grid.remove();
      grid = createGrid();
      document.firstElementChild.style = `--grid-squares-per-side: ${squaresPerSide};`;

      setUpEtchASketch(grid, squaresPerSide);
    } else console.log("user either cancelled or gave invalid input");
  }
}

setUpEtchASketch(
  document.querySelector(".container"),
  16,
  document.querySelector(".configure-squares")
);
