// import { Link } from "react-router-dom";
import React, { useRef, useState, useEffect } from 'react';
import HeaderMain from "./HeaderMain";
import Footer from "./footer";
import { useNavigate } from 'react-router-dom';

export default function AddArtwork() {
  const nav = useNavigate();
  const imageRef = useRef();
  const titleRef = useRef();
  const nameRef = useRef();
  const descriptionRef = useRef();
  const [titleVal, setTitle] = useState("");;
  const [descriptionVal, setDescription] = useState("");
  const [imageVal, setImage] = useState("");
  const [errorMsg, setMsg] = useState("");
  // const [nameVal, setName] = useState("");


  // const [titleDisplay, setTitleDisplay] = useState("");

  function sendFiles(methodX, url, data) {
    console.log(methodX);
    let formdata = new FormData();
    Object.keys(data).forEach(function (key) {
      let value = data[key];
      formdata.append(key, value);
    });

    fetch(url, {
      method: methodX,
      credentials: 'include',
      body: formdata
    }).then(response => {
      if (response.status === 200) {
        nav("/studiospace")
        return response.json()
      }
      return response.json();
    })
  }

  function sendData() {
    let username = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    let title = titleVal;
    let desc = descriptionVal;
    let image = imageVal[0];
    // let name = nameVal;

    if (imageRef.current.value === "" ) {
      imageRef.current.focus();
      setMsg('Please complete missing information');
      console.log("hello");
      return;
    } 

    if (titleRef.current.value === "" ) {
      titleRef.current.focus();
      setMsg('Please complete missing information');
      console.log("heeello");
      return;
    } 

    if (descriptionRef.current.value === "" ) {
      descriptionRef.current.focus();
      setMsg('Please complete missing information');
      console.log("heeeelloooooo");
      return;
    } 

    console.log(image)

    let bodyX = { "title": title, "description": desc, "image": image, "username": username }

    sendFiles("POST", "http://localhost:3001/api/images/arts", bodyX, false, function (event) {
      if (event) {
        return event;
      }
    });
  }

  return (
    <main id="artwork-form">
      {/* <HeaderMain /> */}
      <h1>New Post</h1>
      <div class="error-msg"><p>{errorMsg}</p></div>
      <div id="addArt">
        <div class="addArt_container">
          <div id="file-btn" class="fields">
            <input type="file" ref={imageRef} onChange={(event) => { setImage(event.target.files) }} />
            {/* <button type="submit">Upload</button> */}
          </div>
          {/* <div class="fields">
            <label for="title" >Username:</label>
            <input type="text" ref={nameRef} onChange={(event) => { setName(event.target.value) }} />
          </div> */}
          <div class="fields">
            <label for="title" >Title:</label>
            <input type="text" ref={titleRef} onChange={(event) => { setTitle(event.target.value) }} />
          </div>
          <div class="fields">
            <label for="description" >Description:</label>
            <input class="textbox" type="text" ref={descriptionRef} onChange={(event) => { setDescription(event.target.value) }} />
          </div>
          {/* <div class="fields">
            <label for="password" >:</label>
            <input type="password" ref={passwordRef} onChange={(event) => { setPass(event.target.value) }} />
          </div> */}
          <div class="add-btns">
            <button onClick={() => sendData()} >Submit</button>
            <button onClick={() => nav('/studiospace')} >Cancel</button>
          </div>
        </div>
      </div>

    </main>
  );
}