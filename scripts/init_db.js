const config = require("./firebase-config");
const firebase = require("firebase");
const fs = require("fs");

firebase.initializeApp(config.firebaseConfig);

const db = firebase.firestore();

try {
  const data = fs.readFileSync("movie.csv", "UTF-8");
  const lines = data.split("\r\n");

  lines.forEach((line) => {
    const words = line.split(";");
    db.collection("movies")
      .doc(words[0])
      .set({
        tmdb_id: words[1],
        name: words[2],
      })
      .then(() => {
        console.log("Document written");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  });
} catch (err) {
  console.error(err);
}
