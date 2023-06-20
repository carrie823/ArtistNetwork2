import React, { useRef, useState, useEffect } from 'react';
import Header from "./Header";
import { useNavigate } from "react-router-dom";


export function SignUp() {
  // const [data, setData] = useState();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();
  const copyrightRef = useRef();
  const [nameVal, setName] = useState("");
  const [emailVal, setEmail] = useState("");
  const [passwordVal, setPass] = useState("");;
  const [userVal, setUser] = useState("");
  const [copyrightVal, setCopyright] = useState("false");
  // const [signedUp, setSignedUp] = useState("");
  const [errorMsg, setMsg] = useState("");
  // const [errMsgVal, setError] = useState("");
  const nav = useNavigate();
  // const NameA = document.getElementById("name");
  // const UsernameA = document.getElementById("username");
  // const PasswordA = document.getElementById("password")


  function send(sendMethod, url, data) {

    fetch( url, {
      method: sendMethod,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => {
      if (response.status === 200) {
        nav('/')
        // setSignedUp('Please Sign In on the Login Page')
        return response.json()
      }
      return response.json()
    })
  }

  function sendData(e) {
    e.preventDefault()
    // const nav = useNavigate();
    let nameX = nameVal;
    let pass = passwordVal;
    let user = userVal;
    let copyright = copyrightVal;
    let email = emailVal;
    console.log(copyrightVal)

  if (nameRef.current.value === "" ) {
    nameRef.current.focus();
    setMsg('Please complete missing information');
    console.log("heeeeleleoeoeo");
    return;
  } 
  console.log("hiii");

  if (usernameRef.current.value === "" ) {
    usernameRef.current.focus();
    setMsg('Please complete missing information');
    return;
  } 

  if (passwordRef.current.value === "" ) {
    passwordRef.current.focus();
    setMsg('Please complete missing information');
    return;
  } 

  if (emailRef.current.value === "" ) {
    emailRef.current.focus();
    setMsg('Please complete missing information');
    return;
  } 

  if (!copyrightVal ) {
    copyrightRef.current.focus();
    setMsg('Please complete missing information');
    return;
  } 

  console.log("HELLOLOOOOO")
  
    let bodyX = { name: nameX, email: email, username: user, password: pass, copyright: copyright }

    send("POST", "http://artbycnstudio.com/api/signup/", bodyX, false, function (event) {
      console.log(event)
      if (event) {

        // nav('/login')
        // setSignedUp('Please Sign In on the Login Page')
        return event;
        // return response.json()
      }

    });
    
}

  return (
    <>
      <Header />
      <div id="signup-container">
        <h1>Sign Up</h1>
        <h2>Create Your Account</h2>
        <div id="signup">
        {/* <div><h1>{signedUp}</h1></div> */}
          <div class="signup_container">
          {/* <div><p>{signedUp}</p></div> */}
          <div class="error-msg"><p>{errorMsg}</p></div>
            <form>
              <div class="fields">
                <label for="name" >Name:</label>
                <input id="name" type="text" ref={nameRef} onChange={(event) => { setName(event.target.value) }} />
              </div>
              <div class="fields">
                <label for="email" >Email:</label>
                <input id="email" type="text" ref={emailRef} onChange={(event) => { setEmail(event.target.value) }} />
              </div>
              <div class="fields">
                <label for="username" >Username:</label>
                <input id="username" type="text" ref={usernameRef} onChange={(event) => { setUser(event.target.value) }} />
              </div>
              <div class="fields">
                <label for="password" >Password:</label>
                <input id="password" type="password" ref={passwordRef} onChange={(event) => { setPass(event.target.value) }} />
              </div>
              <div>
                <input type="checkbox" id="copyright" name="copyright" value="agree" ref={copyrightRef} onChange={(event) => { setCopyright(event.target.value) }}/>
                <label for="copyright"> I agree to the Terms and Conditions of Artist Network.</label>
              </div>
              <div >
                <button onClick={(e) => {sendData(e)} }>Sign Up</button>
              </div>
              <div class="login-signup">
                <p>Already have an account?</p> 
                <button onClick={() => nav('/')}>Login</button>
              </div>
              <div>
                <p><strong>Terms and Conditions:</strong></p>
              </div>
              <div>
                <p><strong>Users must submit orginal artwork and abide by Canadian Copyright Laws.</strong></p>
              </div>
              <div>
                <p><strong>Artist Network is not legally repsonsible for any images posted on our platform.</strong></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
