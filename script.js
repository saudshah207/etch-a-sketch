function setUpEtchASketch(
  gridContainer = document.querySelector(".container"),
  squaresPerSide = 16
) {
  const divsAmountToCreate = squaresPerSide * squaresPerSide;

  function createDivs(divsCount) {
    let div;
    for (let index = 0; index < divsCount; index++) {
      div = document.createElement("div");
      div.className = "square";
      gridContainer.append(div);
    }
  }

  createDivs(divsAmountToCreate);

  gridContainer.addEventListener("mouseover", changeDivBg);

  gridContainer.addEventListener("mouseout", changeDivBg);

  function changeDivBg(event) {
    const target = event.target;

    if (target.classList.contains("square")) {
      
      const turnedToRed = target.dataset.turnedToRed;
      target.dataset.turnedToRed = turnedToRed ? "" : true;

      if (turnedToRed) {
        setTimeout(() => {
          target.classList.remove("turn-to-red");
        }, 700);

        return;
      }

      target.classList.add("turn-to-red");
    }
  }
}

setUpEtchASketch(document.querySelector(".container"));
