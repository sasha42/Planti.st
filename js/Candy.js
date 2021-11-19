export default class Candy {
  constructor(container) {
    console.log("Candy");

    // Create candy container
    this.candyContainer = document.createElement("div");
    this.candyContainer.classList.add("candyContainer");

    // Add candy emoji
    let candy = document.createElement("div");
    candy.classList.add("candy");
    this.candyContainer.appendChild(candy);

    // Add congradulatory text
    let text = document.createElement("p");
    text.innerHTML =
      "You just won some candy for finding 3 plants!";
    text.classList.add("candyText");
    this.candyContainer.appendChild(text)

    // Add it to container
    container.appendChild(this.candyContainer);

    // Add the slide animation
    setTimeout(
      function () {
        this.candyContainer.className += " candyOpened";
      }.bind(this),
      100
    );
  }
}
