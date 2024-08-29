import React, { useEffect, useState, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes, Route,
  useNavigate,
  useLocation
} from "react-router-dom";
import { customFetch, refreshTokens } from "./customFetch";
import { navigateToAuthLogin, getToken, setToken, removeToken, backendUrl } from "./utils";


// const base64UrlEncode = (str) => {
//   return btoa(String.fromCharCode.apply(null, new Uint8Array(str)))
//     .replace(/\+/g, "-") 
//     .replace(/\//g, "_")
//     .replace(/=+$/, "");
// }

// const generateCodeChallenge = async(verifier) => {
//   const encoder = new TextEncoder();
//   const data = encoder.encode(verifier);
//   const digest = await window.crypto.subtle.digest("SHA-256", data);
//   return base64UrlEncode(digest);
// }

// const generateCodeVerifier = () => {
//   const array = new Uint32Array(43);
//   window.crypto.getRandomValues(array);
//   return Array.from(array, (dec) => ("0" + dec.toString(16)).substr(-2)).join("");
// }

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <div>
      <h1>{time.toLocaleTimeString()}</h1>
    </div>
  );
};


const Home = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [apiResponse, setApiResponse] = useState("");

  useEffect(() => {
    const checkSession = async () => {
      try {
        // const response = await fetch(`/test-http-stage/check-session`, {
          const response = await fetch(backendUrl + "/localDev/status", {
          credentials: "include",
        });
        if (response.ok) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      } catch (error) {
        console.error("Error checking session:", error);
        setLoggedIn(false);
      }
    };

    checkSession();
  }, []);

  const onClick = async () => {
    if (false) {
      try {
        await fetch(`${backendUrl}/logout`, {
          method: "POST",
          credentials: "include",
        });
        setLoggedIn(false);
      } catch (error) {
        console.error("Error logging out:", error);
      }
      return;
    }

    navigateToAuthLogin();
  };

  const apiProtected = async () => {

    try {
      // const response = await fetch(`/test-rest-stage/auth/testing`, {headers: {
        const response = await fetch(backendUrl + "/auth/protected", {headers: {
        credentials: "include"
      }})     
      setApiResponse(await response.json());

      if(!response.ok) {
        // navigateToAuthLogin();
      }


    }

    catch (error) {
      console.error("Error fetching protected data:", error);
    }

  };

  const checkAuthStatus = async () => {
    try {
      // const response = await fetch(`/test-rest-stage/auth/status`, {
        const response = await fetch(backendUrl + "/localDev/status", {
        credentials: "include",
      });
      if (response.ok) {
        setApiResponse(await response.json());
      } else {
        setApiResponse(await response.json());
        // navigateToAuthLogin();
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      return false;
    }
  }

  const logout = async () => {
    try {
      // await fetch(`/test-rest-stage/auth/logout`, {
      await fetch(backendUrl + "/localDev/logout", {
        method: "POST",
        credentials: "include",
      });
      setLoggedIn(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }


  return (
    <>
      <div>
        <h1>Site.</h1>
        <button onClick={onClick}>{loggedIn ? "Sign Out" : "Sign In"}</button>
        <button onClick={apiProtected}>Protected GET URL call</button>
        <button onClick={checkAuthStatus}>Check Auth Status</button>
        <button onClick={logout}>Logout</button>
      </div>
      <div><Clock /></div>
      <div>Access Token:</div>
      <div>{JSON.stringify(apiResponse)}</div>
    </>
  );
};


const Redirect = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isRequestSent = useRef(false);

  // debugger

  // debugger

  useEffect(() => {
    // const query = new URLSearchParams(location.search);
    // const code = query.get("code");
    // debugger
    // debugger


    function getQueryParameterByName(name, url = window.location.href) {
      name = name.replace(/[\[\]]/g, '\\$&');
      const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
      const results = regex.exec(url);
      if (!results) {
        // Check in the fragment part of the URL
        const fragmentRegex = new RegExp(`[&]${name}(=([^&]*)|&|$)`);
        const fragmentIndex = url.indexOf('#');
        if (fragmentIndex !== -1) {
          const fragment = url.substring(fragmentIndex + 1);
          const fragmentResults = fragmentRegex.exec(`&${fragment}`);
          if (!fragmentResults) return null;
          if (!fragmentResults[2]) return '';
          return decodeURIComponent(fragmentResults[2].replace(/\+/g, ' '));
        }
        return null;
      }
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
    
    // Example usage
    const code = getQueryParameterByName('code');
    const state = getQueryParameterByName('state');

    console.log("code", code); // Outputs the value of the "code" parameter
    console.log("state", state); // Outputs the value of the "state" parameter
    
    
    // const codeVerifier = sessionStorage.getItem("code_verifier");

    
    if (code  && !isRequestSent.current) {
      isRequestSent.current = true;
      
      // fetch("https://login.microsoftonline.com/61127efd-06a0-469e-aaf8-2e22219ef850/oauth2/v2.0/token", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded",
      //   },
      //   body: new URLSearchParams({
      //     grant_type: 'authorization_code',
      //     client_id: '8be50f13-27f0-4ad0-88e6-641b6ac13249',
      //     code: code,
      //     redirect_uri: 'http://localhost:3000/redirect',
      //     code_verifier: codeVerifier,
      //   }),      
      // })
      //   .then(response => response.json())
      //   .then(data => {
      //     sessionStorage.removeItem("code_verifier");
      //     console.log("data", data);
      //     navigate("/");
      //   })
      //   .catch(error => {
      //     console.error("Error:", error);
      //   });



      // fetch(`/test-rest-stage/auth/token`, {
        fetch(backendUrl + "/localDev/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // redirect_uri: "http://localhost:3000/redirect",
          // code_verifier: codeVerifier,
          code: code,
          state: state,
          callbackurl: "http://localhost:3000/auth/redirected",
        }),
        credentials: "include"
      })
        .then(response => response.json())
        .then(data => {
          // sessionStorage.removeItem("code_verifier");
          setToken("access_token", data.access_token);
          setToken("refresh_token", data.refresh_token);
          debugger
          navigate("/");
        })
        .catch(error => {
          console.error("Error:", error);
        });
    }
  }, [location.search]);

  return (
    <div>
      <h1>Handling Redirect...</h1>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/redirected" element={<Redirect />} />
      </Routes>
    </Router>
  );
};

export default App;
