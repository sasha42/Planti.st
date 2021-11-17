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
      this.stampElem.addEventListener("click", this.startCamera);
    }
  }
  startCamera() {
    alert("starting camera");
    window.navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        try {
          console.log(stream);
          //   streamRef.current = stream
          //   videoEle.current.srcObject = streamRef.current
          //   videoEle.current.play()
          const video = document.createElement("video");
          let vidElem = document.getElementById("stamps");
          vidElem.appendChild(video);
          video.srcObject = stream;
          video.play();
        } catch (error) {
          console.error("An error occurred: ", error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
