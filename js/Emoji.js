export default class Emoji {
  constructor(container, state) {
    // Define parameters of emoji stamp
    this.state = state; // empty, active, loading, filled
    this.name = "";
    this.filledTs = 0;
    // this.container = container;

    // Create emoji stamp based on parameters
    this.stampElem = document.createElement("div");
    this.stampElem.classList.add("emoji");
    this.stampElem.classList.add(this.state);

    // Give it a unique ID
    this.stampElem.id = "emoji-" + Math.random().toString(36).slice(-6);

    // Append it to container
    container.appendChild(this.stampElem);
  }
}
