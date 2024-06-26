import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './login';
import Store from './store';
import Home from './home';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState("")

  useEffect(() => {
    // Fetch the user email and token from local storage
    const user = JSON.parse(localStorage.getItem("user"))

    // If the token/email does not exist, mark the user as logged out
    if (!user || !user.token) {
      setLoggedIn(false)
      return
    }

    // If the token exists, verify it with the auth server to see if it is valid
    fetch("http://localhost:3080/verify", {
            method: "POST",
            headers: {
                'jwt-token': user.token
              }
        })
        .then(r => r.json())
        .then(r => {
            setLoggedIn('success' === r.message)
            setEmail(user.email || "")
        })

  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
          <Route path='/login'element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />}/>
          <Route path="/store" element={<Store setLoggedIn={setLoggedIn}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
