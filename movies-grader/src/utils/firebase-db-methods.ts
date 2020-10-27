import firebase from "firebase";

export interface Movie {
  id: string;
  tmdb_id: string;
  name: string;
}

const getData = async (db: firebase.firestore.Firestore, collection: string, doc: string) => {
  const doc_ref = await db.collection(collection).doc(doc).get()
  if (!doc_ref.exists) {
    return null;
  }

  return doc_ref;
};

const getSubcollection = async (db: firebase.firestore.Firestore, collection: string, doc: string, subCollection: string) => {
  return await db.collection(collection).doc(doc).collection(subCollection).get()
};

export const getUserMovies = async () => {
  const db = firebase.firestore();
  const movies_doc = await getData(db, "movies", "movies_data");
  if (!movies_doc) {
    return [];
  }

  const movies: Movie[] = JSON.parse(movies_doc.get("data"));
  const uid = firebase.auth().currentUser?.uid;
  if (!uid) {
    return [];
  }

  const grades_ref = await getSubcollection(db, "users", uid, "grades");
  const grades = grades_ref.docs.map(c => c.id);
  const leftMovies = movies.filter(c => !grades.includes(c.id));

  return leftMovies;
};

export const rateUserMovie = async (movie: Movie, rate: number, haveSeen: boolean) => {
  const db = firebase.firestore();
  const uid = firebase.auth().currentUser?.uid;

  if (!uid) {
    return;
  }

  db.collection("users").doc(uid).collection("grades").doc(movie.id).set({
    id: movie.id,
    tmdb_id: movie.id,
    name: movie.name,
    rate,
    haveSeen
  });
}