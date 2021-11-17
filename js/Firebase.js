import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import {
  getAuth,
  signInAnonymously,
} from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";

import {
  getDatabase,
  ref,
  set,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";

import EventEmitter from "./EventEmitter.js";

export default class Firebase extends EventEmitter {
  constructor() {
    super(); // Takes into account previously defined constructor and classes in Eventemitter
    const firebaseConfig = {
        apiKey: "AIzaSyDTDS3ma2JEwUUAn-XOznind4WVM5rS8Zo",
        authDomain: "hexagon-e89e5.firebaseapp.com",
        databaseURL: "https://hexagon-e89e5-default-rtdb.firebaseio.com",
        projectId: "hexagon-e89e5",
        storageBucket: "hexagon-e89e5.appspot.com",
        messagingSenderId: "934460359239",
        appId: "1:934460359239:web:cf243ad9a0c4b9f2f06762"
      };

    // Initialize firebase
    this.app = initializeApp(firebaseConfig);

    // Authenticate anonymously
    this.auth = getAuth();

    signInAnonymously(this.auth).then(() => {
      console.log("[FIREBASE] Signed in");
    });

    // Get the database object and choose path
    this.DATABASE = getDatabase();
    this.path = ref(this.DATABASE, "exercice");

    // Handle incoming data
    onValue(this.path, (snapshot) => {
      // Check if there is a first value already defined, so that we ignore
      // onValue calls when the page is loaded with stale data
      if (!this.resume) {
        this.resume = true;
      } else {
        const val = snapshot.val();
        this.emit("messageReceived", [val]);
      }
    });
  }
  send(objet) {
    //ecriture dans la base de donnee
    set(this.path, objet);
  }
}
