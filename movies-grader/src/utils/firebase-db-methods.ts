import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export interface Grade {
  id: string;
  tmdb_id: string;
  name: string;
  rate: number;
  haveSeen: boolean;
  rated: boolean;
}

export interface Movie {
  id: string;
  tmdb_id: string;
  name: string;
}

const shuffle = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const getData = async (
  db: firebase.firestore.Firestore,
  collection: string,
  doc: string
) => {
  const doc_ref = await db.collection(collection).doc(doc).get();
  if (!doc_ref.exists) {
    return null;
  }

  return doc_ref;
};

export const getUserMovies = async () => {
  const db = firebase.firestore();
  const uid = firebase.auth().currentUser?.uid;
  if (!uid) {
    return [];
  }

  const userDoc = await getData(db, "users", uid.toString());
  if (!userDoc || !userDoc?.get("grades")) {
    await createMoviesCollectionForUser(db, uid);
  }

  const userGradesDoc = await getData(db, "users", uid.toString());

  if (!userGradesDoc) {
    return [];
  }

  const movies: Grade[] = JSON.parse(userGradesDoc.get("grades"));

  return movies;
};

export const createMoviesCollectionForUser = async (
  db: firebase.firestore.Firestore,
  uid: string
) => {
  const movies_doc = await getData(db, "movies", "movies_data");

  if (!movies_doc) {
    return [];
  }

  const movies: Movie[] = JSON.parse(movies_doc.get("data"));

  shuffle(movies);

  const grades: Grade[] = movies.map((c) => ({
    id: c.id,
    tmdb_id: c.tmdb_id,
    name: c.name,
    rate: 0,
    haveSeen: true,
    rated: false,
  }));

  await db
    .collection("users")
    .doc(uid)
    .set({ grades: JSON.stringify(grades) });
};

export const updateGrades = async (grades: Grade[]) => {
  const db = firebase.firestore();
  const uid = firebase.auth().currentUser?.uid;

  if (!uid) {
    return;
  }

  await db
    .collection("users")
    .doc(uid)
    .set({ grades: JSON.stringify(grades) });
};
