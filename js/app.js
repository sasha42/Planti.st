// import Firebase from "./Firebase.js";
import Emoji from "./Emoji.js"
import Camera from "./Camera.js"

export default class DomApp {
  constructor() {
    console.log("App started");

    // Create new emoji stamp in stamp container
    this.container = document.getElementById('stamps')
    // this.emoji = new Emoji(this.container, 'empty');
    // this.emojiTwo = new Emoji(this.container, 'filled');
    // this.emojiThree = new Emoji(this.container, 'loading');

    // Create camera interaction
    this.camera = new Camera(this.container);
  }
}

window.onload = () => {
  new DomApp();
};
