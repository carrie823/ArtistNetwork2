import React, { useRef, useState, useEffect } from 'react';
import Header from './Header';
import { useNavigate } from "react-router-dom";
// import HeaderMain from "./HeaderMain";
// import {NavLink} from "react-router-dom";

export function Login() {
  // const nameRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();
  // const [nameVal, setName] = useState("");
  const [passwordVal, setPass] = useState("");;
  const [userVal, setUser] = useState("");
  const nav = useNavigate();
  const [errorMsg, setMsg] = useState("");

  function send(sendMethod, url, data) {

    fetch(url, {
      method: sendMethod,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify(data)
    }).then(response => {
      if (response.status === 200) {
        nav("/homefeed")
        return response.json()
      } 
      else if (response.status === 401){
        console.log("ghghghghgh")
        setMsg('Incorrect username or password');
        return response.json();
      }
      // return response.json();
    })
  }

console.log("heheheh")
  function sendData() {
    // let nameX = nameVal;
    let pass = passwordVal;
    let user = userVal;
    console.log(user)

  // if (response.status === 400) {
  //   nameRef.current.focus();
  //   setMsg('Incorrect username or password');
  //   console.log("heeeeleleoeoeo");
  // } 

    let bodyX = { username: user, password: pass }

    send("POST", "http://artbycnstudio.com/api/login/", bodyX, false, function (event) {

      if (event) {
        nav("/homefeed")
      }
    });

  }


  return (
    <>
      <Header />
      <div id="login">
        <h1>Login</h1>
        <div class="error-msg"><p>{errorMsg}</p></div>
        <div class="login_container">
          {/* <div class="fields">
            <label for="name" >Name:</label>
            <input type="text" ref={nameRef} onChange={(event) => { setName(event.target.value) }} />
          </div> */}
          <div class="fields">
            <label for="username" >Username:</label>
            <input type="text" ref={usernameRef} onChange={(event) => { setUser(event.target.value) }} />
          </div>
          <div class="fields">
            <label for="password" >Password:</label>
            <input type="password" ref={passwordRef} onChange={(event) => { setPass(event.target.value) }} />
          </div>
          <div>
            <button onClick={() => sendData()} >Login</button>
          </div>
          <div class="login-signup">
            <p>Don't have an account?</p>
            <button onClick={() => nav('/signup')}>Sign Up</button>
          </div>
          <div class="social-icons-login">
          <a href='https://twitter.com/'><i class="fa-brands fa-twitter"></i></a>
          <a href='https://www.facebook.com/'><i class="fa-brands fa-facebook"></i></a>
          <a href='https://www.instagram.com/'><i class="fa-brands fa-instagram"></i></a>
          </div>
        </div>
      </div>

    </>
  );
}
