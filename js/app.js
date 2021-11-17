// import Firebase from "./Firebase.js";
import Emoji from "./Emoji.js"

export default class DomApp {
  constructor() {
    console.log("DOM App");

    // Create new emoji stamp in stamp container
    this.container = document.getElementById('stamps')
    this.emoji = new Emoji(this.container, 'empty');
    this.emojiTwo = new Emoji(this.container, 'filled');
    this.emojiThree = new Emoji(this.container, 'loading');
  }
}

window.onload = () => {
  new DomApp();
};
