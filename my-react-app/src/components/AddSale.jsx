// import { Link } from "react-router-dom";
import React, { useRef, useState, useEffect } from 'react';
// import HeaderMain from "./HeaderMain";
import { useNavigate } from 'react-router-dom';
// import Footer from "./footer";

export default function AddSale() {
  const nav = useNavigate();
  const imageRef = useRef();
  const titleRef = useRef();
  // const nameRef = useRef();
  const descriptionRef = useRef();
  const linkRef = useRef();
  const [titleVal, setTitle] = useState("");;
  const [descriptionVal, setDescription] = useState("");
  const [imageVal, setImage] = useState("");
  const [linkVal, setLink] = useState("");
  const [errorMsg, setMsg] = useState("");
  // const [nameVal, setName] = useState("");



  function sendFiles(methodX, url, data) {
    
    console.log(methodX);
    let formdata = new FormData();
    Object.keys(data).forEach(function (key) {
      let value = data[key];
      formdata.append(key, value);
    });
    // console.log("HI")
    // console.log(formdata)
    // console.log(methodX)
    fetch(url, {
      method: methodX,
      credentials: 'include',
      body: formdata
    }).then(response => {
      if (response.status === 200) {
        nav("/artistalley")
        return response.json()
      }
      return response.json();
    })

  }

  function sendData() {
    let username = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    let title = titleVal;
    let desc = descriptionVal;
    let imageX = imageVal[0];
    let link = linkVal;
    // let name = nameVal;
    console.log(link)

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

    if (linkRef.current.value === "" ) {
      linkRef.current.focus();
      setMsg('Please complete missing information');
      console.log("heeeelloooooo");
      return;
    } 

    let bodyX = { "title": title, "description": desc, "link": link, image: imageX, "username": username }

    sendFiles("POST", "http://artbycnstudio.com/api/images/sales", bodyX, false, function (event) {
      console.log(event)
      if (event) {
        return event;
      }
    });
  }

  return (
    <main id="sale-form">

      <h1>New Post</h1>
      <div class="error-msg"><p>{errorMsg}</p></div>
      <div id="addArt">
        <div class="addArt_container">
          <input type="file" ref={imageRef} onChange={(event) => { setImage(event.target.files) }} />
          {/* <button type="submit">Upload</button> */}
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
          <div class="fields">
            <label for="link" >Shop Link:</label>
            <input type="text" ref={linkRef} onChange={(event) => { setLink(event.target.value) }} />
          </div>
          <div class="add-btns">
            <button onClick={() => sendData()} >Submit</button>
            <button onClick={() => nav('/artistalley')} >Cancel</button>
          </div>
        </div>
      </div>

    </main>
  );
}