function setUpEtchASketch(
  grid = document.querySelector(".container"),
  squaresPerSide = 16
) {
  const divsAmountToCreate = squaresPerSide * squaresPerSide;
  let isRandomColorsOn = false,
    isProgressiveDarkeningOn = false;

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
    const target = event.target,
      turnedToBlack = target.dataset.turnedToBlack,
      opacity = +target.style.opacity;

    if (target.classList.contains("square")) {
      if (isProgressiveDarkeningOn) {
        darkenByTenPercent();
      } else {
        completelyDarken();
      }

      if (isRandomColorsOn) {
        turnToRandomColor();
      } else {
        turnToBlack();
      }
    }

    function turnToBlack() {
      if (turnedToBlack) return;

      target.classList.add("turn-to-black");
      target.style.backgroundColor = "";
      target.dataset.turnedToBlack = true;
    }

    function turnToRandomColor() {
      target.style.backgroundColor = getRandomColor(256);

      if (turnedToBlack) {
        delete target.dataset.turnedToBlack;
        target.classList.remove("turn-to-black");
      }
    }

    function darkenByTenPercent() {
      if (opacity < 1) target.style.opacity = opacity + 0.1;
    }

    function completelyDarken() {
      const computedOpacity = +getComputedStyle(target).opacity;
      if (computedOpacity < 1) target.style.opacity = 1;
    }
  }

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

  function updateToggleText(toggle, OnOffBoolean, featureText) {
    const toggleTextIndication = OnOffBoolean ? "Off" : "On";

    toggle.textContent = `Turn ${toggleTextIndication} ${featureText}`;
  }

  function toggleFeature(toggle, featureBoolean, featureText) {
    featureBoolean = featureBoolean ? false : true;

    updateToggleText(toggle, featureBoolean, featureText);

    return featureBoolean;
  }

  function getRandomColor(exclusiveUpToNumber) {
    function getRandomNumber(exclusiveUpTo) {
      return Math.floor(Math.random() * exclusiveUpTo);
    }

    return `rgb(${getRandomNumber(exclusiveUpToNumber)},
      ${getRandomNumber(exclusiveUpToNumber)},
      ${getRandomNumber(exclusiveUpToNumber)})`;
  }

  function resetEtchASketch(squaresPerSide = 16) {
    grid.remove();
    grid = createGrid();

    grid.addEventListener("mouseover", changeDivBg);

    document.firstElementChild.style = `--grid-squares-per-side: ${squaresPerSide};`;

    createDivs(squaresPerSide * squaresPerSide);
  }

  document.addEventListener("click", delegateClickEvent);

  function delegateClickEvent(event) {
    const buttonType = event.target.dataset.buttonType;

    switch (buttonType) {
      case "configure-squares":
        askUserForGridSquaresPerSide();
        break;

      case "random-colors-toggle":
        isRandomColorsOn = toggleFeature(
          event.target,
          isRandomColorsOn,
          "Random Colors"
        );
        break;

      case "reset":
        resetEtchASketch();
        break;

      case "progressive-darkening-toggle":
        isProgressiveDarkeningOn = toggleFeature(
          event.target,
          isProgressiveDarkeningOn,
          "Light to Dark Colors"
        );
        break;

      default:
    }
  }
}

setUpEtchASketch(document.querySelector(".container"), 16);
