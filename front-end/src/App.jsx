import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import "./App.css";


function App() {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);


  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/user", {
          credentials: "include",
          headers: {
            "Accept": "application/json",
          },
        });




        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Gagal memeriksa status login:", err);
        setUser(null);
      }
    };


    checkLoginStatus();
  }, []);


  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Accept": "application/json",
        },
      });


      setUser(null);
    } catch (err) {
      console.error("Gagal logout:", err);
    }
  };


  if (!user) {
    return showRegister ? (
      <RegisterForm onRegister={setUser} switchToLogin={() => setShowRegister(false)} />
    ) : (
      <LoginForm onLogin={setUser} switchToRegister={() => setShowRegister(true)} />
    );
  }


  return (
    <>
      <h1>Selamat datang, {user.name} 👋</h1>
      <button onClick={handleLogout}>
        Logout
      </button>
      {/* nanti lanjut tampilkan daftar produk */}
    </>
  );
}


export default App;