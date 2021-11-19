import Camera from "./Camera.js";
export default class Emoji {
  constructor(container, state) {
    // Define parameters of emoji stamp
    this.state = state; // empty, active, loading, filled
    this.name = "";
    this.filledTs = 0;
    this.container = container;

    // Create emoji stamp based on parameters
    this.stampElem = document.createElement("div");
    this.stampElem.classList.add("emoji");
    this.stampElem.classList.add(this.state);

    // Give it a unique ID
    this.stampElem.id = "emoji-" + Math.random().toString(36).slice(-6);

    // Append it to container
    container.appendChild(this.stampElem);

    // Make new button clickable for camera
    if (this.state === "empty") {
      console.log("we have a live one");
      this.stampElem.addEventListener("click", this.openCameraModal.bind(this));
    }
  }

  async openCameraModal() {
    // Create new camera modal
    let cam = new Camera(this.container);

    // Start camera
    cam.startCamera();

    // Await result of event listener
    // Make button clickable for camera. The bind is important in
    // order to pass the 'this' context over to the function
    cam.videoButton.addEventListener(
      "click",
      async () => {
        cam.capturePhoto().then((data) => {
          this.stampElem.classList.remove("empty");
          this.stampElem.classList.add("loading");
          cam.sendData(data).then((response) => {
            this.handleResponse(response);
          });
        });
      },
      false
    );
    setTimeout(function () {
      document.getElementsByClassName("videoBg")[0].style.top = 0;
    }, 100);
    e.preventDefault();
  }

  handleResponse(response) {
    console.log(response);
    if (response === "FAIL") {
      this.stampElem.classList.remove("loading");
      this.stampElem.classList.add("warn");
      setTimeout(function () {
        this.stampElem.classList.remove("warn");
        this.stampElem.classList.add("empty");
      }.bind(this), 1000);
    } else {
      this.stampElem.classList.remove("loading");
      this.stampElem.classList.add("filled");
      // stop listening to clicks on this emoji
    //   this.stampElem.parentNode.innerHTML += '';
    }
  }

  updateState(newState) {
    console.log(newState);
    console.log(this.state);
    console.log("this should update");
  }
}
