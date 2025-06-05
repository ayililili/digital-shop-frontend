import { useEffect, useState } from "react";
import { auth, provider } from "./firebase";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div>
      {user ? (
        <>
          <p>👋 Hello, {user.displayName}</p>
          <button onClick={handleLogout}>登出</button>
        </>
      ) : (
        <button onClick={handleLogin}>使用 Google 登入</button>
      )}
    </div>
  );
}

export default App;
