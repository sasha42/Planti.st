// import DomApp from "./app.js";
import DomApp from "./app.js";
import Emoji from "./Emoji.js";

export default class Camera {
  constructor(container, state) {
    // Get state from emoji
    // super(state);

    // Define the state of the camera and recover the parent container
    this.state = state; // empty, active, loading, filled
    this.container = container;
    this.result = "nothing";

    // Create a container which contains the video, and add a class
    // via timeout to ensure that we have css animations (they don't
    // work when you create a new component, you need to nudge css)
    this.videoContainer = document.createElement("div");
    this.videoContainer.classList.add("videoBg");
    this.container.appendChild(this.videoContainer);
    setTimeout(
      function () {
        this.videoContainer.className += " videoBgTrans";
      }.bind(this),
      0
    );

    // Create camera preview and append it to container
    this.video = document.createElement("video");
    this.video.setAttribute("playsinline", true);
    this.videoContainer.appendChild(this.video);

    // Create capture plant button and give it a name
    this.videoButton = document.createElement("input");
    this.videoButton.setAttribute("type", "submit");
    this.videoButton.value = "Capture plant";
    this.videoContainer.appendChild(this.videoButton);

    // document.addEventListener( "click", function (e) {e.preventDefault();},{ passive: false });

    // Polyfix for iOS devices, which have a notch and act funky without
    // recognizing the correct mediaquery via CSS
    let isIOS =
      /iPad|iPhone|iPod/.test(navigator.platform) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    if (isIOS === true) {
      this.video.setAttribute("style", "height:62.5%");
    }

    // Append video container to the parent container
    container.appendChild(this.videoContainer);

    this.resetZoom();

    // Start camera
    // this.startCamera();
  }

  resetZoom() {
    let windowHeight = window.innerHeight;
    let body = document.getElementsByTagName("body")[0];

    body.style.height = windowHeight + "px";
  }

  async doMagic() {
    this.startCamera();
    return "so much MAAAAGIC";
  }

  startCamera() {
    // Request to the browser a new camera instantiation, with
    // a specific request to use the back camera for mobile devices
    // using the 'environment' facingMode
    window.navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          facingMode: "environment",
        },
      })
      // Once we have a stream from the browser, add it to the src of our
      // video preview and play it
      .then((stream) => {
        try {
          this.video.srcObject = stream;
          this.video.play();
          console.log("Webcam opened");
        } catch (error) {
          console.error("An error occurred: ", error);
        }
      })
      .catch((error) => {
        alert(
          "Unable to access Camera, please enable Camera permission in Settings"
        );
        window.location.reload();
        console.log(error);
      });
  }

  async capturePhoto() {
    // Prevent default funky behavior
    event.preventDefault();

    // Fix width and height
    const width = this.video.videoWidth;
    const height = this.video.videoHeight;

    // You need to have a canvas in order to capture a photo from it,
    // so we're using a hidden one in the html
    var context = canvas.getContext("2d");
    context.width = width;
    context.height = height;

    // Capture image from the webcam and create a dataURL
    context.drawImage(this.video, 0, 0, width, height);
    var data = canvas.toDataURL("image/png");
    console.log("Image captured");

    // Pause the webcam, stop the video track (otherwise the browser
    // keeps the webcam on), and remove the video from the page
    this.video.pause();
    this.video.srcObject.getVideoTracks()[0].stop();
    this.videoContainer.remove();

    return data;

    // TODO FIXME
    // Once the photo is captured, remove the Camera component
    // and replace it with a loading Emoji stamp
    // this.videoContainer.classList.remove("videoBgTrans");
    // this.videoContainer.setAttribute("style", "opacity:0.6");
    // this.videoContainer.classList.add("loading");
    // new Emoji(this.container, "loading");

    // Send image up for analysis
    // this.sendData(data);
  }

  async sendData(data) {
    // Set up the parameters for an upload to plant.id, including
    // the image data itself and the API key
    const postData = {
      api_key: "Xi0BEHThZpp1q88j6aoin9szYAzb2vXQZs55sAZLWJhp96pdvu",
      //   api_key: "-- ask for one: https://web.plant.id/api-access-request/ --",
      // images: base64files,
      images: [data],
      modifiers: ["crops_fast", "similar_images"],
      plant_language: "en",
      plant_details: [
        "common_names",
        "url",
        "name_authority",
        "wiki_description",
        "taxonomy",
        "synonyms",
      ],
    };

    // async function tj_customer_name(id) {
    //     const response = await fetch('some-url', {});
    //     const json = await response.json();

    //     return json.first_name.concat(' ').concat(json.last_name);
    // }

    // Fetch the data from plant.id
    const plantData = await fetch("https://api.plant.id/v2/identify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // if (data["is_plant_probability"] > 0.015) {
        let plant = data["suggestions"][0]["plant_name"];
        let prob = parseFloat(data["suggestions"][0]["probability"]).toFixed(2);
        let globalProb = parseFloat(data["is_plant_probability"]).toFixed(2);
        parseFloat("123.456").toFixed(2);
        if (prob > 0.15 && plant != "Phalaenopsis") {
          console.log(
            `Plant: ${plant} \nProb: ${prob} \nGlobal prop: ${globalProb}`
          );
          // super.updateState();
          this.result = "lol";
          console.log("Success:", data);
          return plant;
        } else {
          return "FAIL";
        }
      })
      .catch((error) => {
        console.log(error);
        console.log("ONE");
        this.result = "asdf";
        // super.updateState();
        console.error("Error:", error);
        alert(
          "Unable to access server, check your internet connection and try again"
        );
        window.location.reload();
        return "FAIL";
      });

    return plantData;
  }

  returnResult() {
    console.log("RESULT");

    return this.result;
  }
}
