import { getAuth } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';

const auth = getAuth();
const db = getDatabase();

export default function Account() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const userId = user.uid;
        const userRef = ref(db, `users/${userId}`);
        onValue(userRef, snapshot => {
          const userData = snapshot.val();
          setUser(userData);
        });
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h1>Account info</h1>
          <p>Email: {user.email}</p>
          <p>Name: {user.name}</p>
          <p>Age: {user.age}</p>
          <p>Disliked Genre(s):{user.disliked_genres}</p>
          <p>Liked Genre(s): {user.liked_genres}</p>
          <p>Page preference: {user.page_preference}</p>

        </div>
      ) : (
        <p>Please sign in to view account information.</p>
      )}
    </div>
  );
}
