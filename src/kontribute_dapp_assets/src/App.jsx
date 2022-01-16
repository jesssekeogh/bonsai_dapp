import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// for authentication:
import { AuthClient } from "@dfinity/auth-client";

// CSS
import "../assets/main.css";

// pages:
import Stories from './Stories';

// containers & components:
import { HomeList, NavBar } from './containers';

// this is the launch page:

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/world-of-bonsai" element={<Stories />} />
      </Routes>
    </Router>
  );
}

export default App;

function Home() {
  const [signedIn, setSignedIn] = useState(false)
  const [principal, setPrincipal] = useState("")
  const [client, setClient] = useState()

  const initAuth = async () => {
    const client = await AuthClient.create()
    const isAuthenticated = await client.isAuthenticated()
    
    setClient(client)

    if (isAuthenticated) {
      const identity = client.getIdentity()
      const principal = identity.getPrincipal().toString()
      setSignedIn(true)
      setPrincipal(principal)
    }
  }
  
  const signIn = async () => {
    const { identity, principal } = await new Promise((resolve, reject) => {
      client.login({
        identityProvider: "https://identity.ic0.app",
        onSuccess: () => {
          const identity = client.getIdentity()
          const principal = identity.getPrincipal().toString()
          resolve({ identity, principal })
        },
        onError: reject,
      })
    })
    setSignedIn(true)
    setPrincipal(principal)
  }

  const signOut = async () => {
    await client.logout()
    setSignedIn(false)
    setPrincipal("")
  }

  useEffect(() => {
    initAuth()
  }, [])

    return (
      <div className="auth-section">

      {!signedIn && client ? (
        <button onClick={signIn} className="auth-button">
          Sign in
          <img style={{ width: "33px", marginRight: "-1em", marginLeft: "0.7em" }} src="" />
        </button>
      ) : null}

      {signedIn ? (
        <>
          <p>Signed in as: {principal}</p>
          <button onClick={signOut} className="auth-button">Sign out</button>
        </>
      ) : null}

    </div>
    )
}
