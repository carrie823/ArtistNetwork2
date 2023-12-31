import React, { useRef, useState, useEffect } from 'react';
// import HeaderMain from "./HeaderMain";
// import Footer from "./footer";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function EditSales() {

  const nav = useNavigate();
  const location = useLocation();
  const imageRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const linkRef = useRef();
  // const linkRef = useRef();
  const [titleVal, setTitle] = useState("");;
  const [descriptionVal, setDescription] = useState("");
  const [linkVal, setLink] = useState();
  // const [imageVal, setImage] = useState("");
  // const [linkVal, setLink] = useState("");
  const [id, setID] = useState("");
  const [errorMsg, setMsg] = useState("");


  function sendEdit() {

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

    let updatedItemData = { "title": titleVal, "description": descriptionVal, "link": linkVal }
    console.log(location)
    fetch(`http://artbycnstudio.com/api/items/updatesale/${location.state._id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedItemData)
    })
      .then(response => {
        if (response.ok) {
          console.log('Item updated successfully');
          nav("/artistalley")
          // Perform any necessary actions after successful update
        } else {
          console.log('Failed to update item');
        }
      })
      .catch(error => {
        console.log('Error:', error);
      });

  }


  return (
    <main id="sale-form">

      <h1>Edit Sale</h1>
      <div class="error-msg"><p>{errorMsg}</p></div>
      <div id="edit-art">
        <div class="edit_container">
          <div class="fields">
            <label for="title">Title:</label>
            <input type="text" ref={titleRef} onChange={(event) => { setTitle(event.target.value) }} />
          </div>
          <div class="fields">
            <label for="description">Description:</label>
            <input class="textbox" type="text" ref={descriptionRef} onChange={(event) => { setDescription(event.target.value) }} />
          </div>
          <div class="fields">
            <label for="link">Shop Link:</label>
            <input type="text" ref={linkRef} onChange={(event) => { setLink(event.target.value) }} />
          </div>
          <div class="edit-btns">
            <button onClick={() => sendEdit()} >Submit</button>
            <button onClick={() => nav('/artistalley')} >Cancel</button>
          </div>
        </div>
      </div>

    </main>
  );

}