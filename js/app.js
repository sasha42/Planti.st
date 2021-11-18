// import Firebase from "./Firebase.js";
import Emoji from "./Emoji.js"
// import Camera from "./Camera.js"

export default class DomApp {
  constructor() {
    console.log("App started");

    // Create new emoji stamp in stamp container
    this.container = document.getElementById('stamps')

    // Create a 
    this.emojis = [] 
    window.emojis = this.emojis;
    this.emojis.push(new Emoji(this.container, 'empty'));
    // this.emojiTwo = new Emoji(this.container, 'filled');
    // this.emojiThree = new Emoji(this.container, 'loading');

    // Create camera interaction
    // this.camera = new Camera(this.container);
  }
  updateEmojis() {
      console.log('yup')
      console.log(window.emojis);
      console.log(this.emojis);
  }
}

window.onload = () => {
  new DomApp();
};
