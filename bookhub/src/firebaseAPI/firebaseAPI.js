import { initializeApp, getApps, getApp } from 'firebase/app';
import {
    getDatabase, ref, get, child, set, onValue, push, update, remove, query, orderByChild, equalTo, off
} from 'firebase/database';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyASVYySOu4JHhrNJQOWW28kXNk_iOc-CBY",
    authDomain: "bookhub-a0f39.firebaseapp.com",
    databaseURL: "https://bookhub-a0f39-default-rtdb.firebaseio.com",
    projectId: "bookhub-a0f39",
    storageBucket: "bookhub-a0f39.appspot.com",
    messagingSenderId: "1007110447767",
    appId: "1:1007110447767:web:7b73245fd783c92926bfd2"
};

// Initialize Firebase
let app; if (!getApps().length) { app = initializeApp(firebaseConfig); } else { app = getApp(); }

const db = getDatabase();
const dbRef = ref(getDatabase());

// GET APIs
/**
 * @param path: the path of database's data
 * @returns return value of database snapshot based on given param and path
 */
function getData(path, callback) {
    const valueRef = ref(db, path);

    onValue(valueRef, (snapshot) => {
        if (snapshot.exists()) {
            callback(Object.values(snapshot.val()));
            return snapshot.val();
        } else {
            return "No data";
        }
    });

}

function getGenre(uid) {
    return new Promise(function (resolve, reject) {
        try {
            const valueRef = ref(db, 'users/' + uid + '/liked_genres');

            onValue(valueRef, (snapshot) => {
                if (snapshot.exists()) {
                    resolve(Object.values(snapshot.val()));
                } else {
                    resolve(null);
                }
            });
        }
        catch (e) {
            reject(e);
        }
    })
}

function getDislikes(uid, cb) {
    const valueRef = ref(db, 'users/' + uid + '/dislike');

    onValue(valueRef, (snapshot) => {
        if (snapshot.exists()) {
            cb(Object.values(snapshot.val()));
        } else {
            cb([]);
        }
    });
}

// POST APIs

/**
 * takes in uid, name, age email and add a user to the database at /users/{uid}
 * 
 * @param {*} uid user's special uid from authentication
 * @param {*} name 
 * @param {*} age 
 * @param {*} email 
 * @returns 
 */
function CreateNewUser(uid, name, age, email, yesGenres, noGenres, pages) {
    const db = getDatabase();
    //text post entry
    const user_post = {
        name: name,
        age: age,
        email: "" + email,
        liked_genres: yesGenres,
        disliked_genres: noGenres,
        page_preference: pages
    };

    //retrieve key
    const newKey = push(child(ref(db), 'users')).key;

    const updates = {};
    updates['/users/' + uid] = user_post;
    return update(ref(db), updates).catch((error) => { console.log(error) });
}

function addBookToUser(uid, name, auth) {
    if (!auth) {
        //alert replace later
        alert("Not Logged In!")
        return;
    }
    const db = getDatabase();
    const user_ref = ref(db, 'users/' + uid + '/liked_books');
    const book_ref = push(user_ref);
    return set(book_ref, name);
}

/**
 * 
 * @param {*} uid 
 * @param {*} name 
 * @param {*} auth 
 * @returns 
 */
function addBookToCompleted(uid, data, name, auth) {
    if (!auth) {
        //alert replace later
        alert("Not Logged In!")
        return;
    }
    let included = false;
    const db = getDatabase();
    const user_ref = ref(db, 'users/' + uid + '/completed_books');
    const check_ref = ref(db, 'users/' + uid + '/completed_books_names');

    console.log(data);
    onValue(check_ref, (snapshot) => {
        if (snapshot.exists()) {
            let books = Object.values(snapshot.val())
            console.log(books)
            console.log(name);
            console.log(books.includes(name))
            if (books.includes(name)) included = true;
        }
    });

    if (included) return;

    //retrieve key
    const newKey = push(child(ref(db), '/users/' + uid + '/completed_books/')).key;

    const updates = {};
    updates['/users/' + uid + '/completed_books/' + newKey] = data;
    updates['/users/' + uid + '/completed_books_names/' + newKey] = name;
    return update(ref(db), updates).catch((error) => { console.log(error) });
}

/**
 * 
 * @param {*} uid 
 * @param {*} name 
 * @param {*} auth 
 * @returns 
 */
function addBookToForLater(uid, data, name, auth) {
    let included = false;

    if (!auth) {
        //alert replace later
        alert("Not Logged In!")
        return;
    }
    const db = getDatabase();
    const user_ref = ref(db, 'users/' + uid + '/liked_books/');

    onValue(user_ref, (snapshot) => {
        if (snapshot.exists()) {
            let books = Object.values(snapshot.val())
            if (books.includes(name)) included = true;
        }
    });

    if (included) return;

    //retrieve key
    const newKey = push(child(ref(db), '/users/' + uid + '/forLater_books/')).key;

    const updates = {};
    updates['/users/' + uid + '/forLater_books/' + newKey] = data;
    updates['/users/' + uid + '/liked_books/' + newKey] = name;
    return update(ref(db), updates).catch((error) => { console.log(error) });

}

/**
 * 
 * @param {*} uid 
 * @param {*} name 
 * @param {*} auth 
 * @returns 
 */
function addBookToLightReading(uid, data, name, auth) {
    if (!auth) {
        //alert replace later
        alert("Not Logged In!")
        return;
    }
    let included = false;
    const db = getDatabase();
    const user_ref = ref(db, 'users/' + uid + '/lightReading');
    const check_ref = ref(db, 'users/' + uid + '/lightReading_names');

    console.log(data);
    onValue(check_ref, (snapshot) => {
        if (snapshot.exists()) {
            let books = Object.values(snapshot.val())
            console.log(books)
            console.log(name);
            console.log(books.includes(name))
            if (books.includes(name)) included = true;
        }
    });

    if (included) return;

    //retrieve key
    const newKey = push(child(ref(db), '/users/' + uid + '/lightReading/')).key;

    const updates = {};
    updates['/users/' + uid + '/lightReading/' + newKey] = data;
    updates['/users/' + uid + '/lightReading_names/' + newKey] = name;
    return update(ref(db), updates).catch((error) => { console.log(error) });

}

function addBooktoDislike(uid, name, auth) {
    let included = false;
    if (!auth) {
        //alert replace later
        alert("Not Logged In!")
        return;
    }

    const db = getDatabase();
    const user_ref = ref(db, 'users/' + uid + '/dislike');

    onValue(user_ref, (snapshot) => {
        if (snapshot.exists()) {
            let books = Object.values(snapshot.val())
            console.log(books)
            console.log(name);
            console.log(books.includes(name))
            if (books.includes(name)) included = true;
        }
    });

    if (included) return;

    const book_ref = push(user_ref);
    return set(book_ref, name)
}



// PUT APIS
function updateData(content, key, date, category) {
    const db = getDatabase();

    //retrieve post
    const path = 'Posts/' + key;
    const post = ref(db, path);


    const updates = {};
    updates['/content'] = content;
    updates['/time'] = date;
    updates['/category'] = category;
    update(ref(db, path), updates).catch(error => { alert("Unathorized Access!") });
    return "";
}



//Google Books API
/**
 * 
 * @param {*} name : name of book
 * @param {*} author : name of author
 * @param {*} subject : name of category
 * @returns Promise Object that contains query result
 */
function getBook(name, author, subject) {
    let i = 0;
    let name_q = name === "any" ? "*" : name;
    let author_q = author === "any" ? "" : `+inauthor:${author}`
    let subject_q = subject === "any" ? "" : `+subject:${subject}`

    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${name_q}${author_q}${subject_q}&maxResults=40`);
}
export { getGenre, getDislikes, getData, getBook, CreateNewUser, addBookToUser, addBookToCompleted, addBookToForLater, addBookToLightReading, addBooktoDislike }