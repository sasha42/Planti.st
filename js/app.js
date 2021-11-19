// import Firebase from "./Firebase.js";
import Emoji from "./Emoji.js"
// import Camera from "./Camera.js"

export default class DomApp {
  constructor() {
    console.log("App started");

    // Create new emoji stamp in stamp container
    this.container = document.getElementById('stamps')

    // Create an empty plant counter
    window.plantCount = 0;

    // Create the three emojis 
    this.emojis = [] 
    window.emojis = this.emojis;
    this.emojis.push(new Emoji(this.container, 'empty'));
    this.emojis.push(new Emoji(this.container, 'empty'));
    this.emojis.push(new Emoji(this.container, 'empty'));
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
