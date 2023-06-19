// import { Link } from "react-router-dom";
// import HeaderMain from "./HeaderMain";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function StudioSpaceInfo() {
  const nav = useNavigate();
  // const artRef = useRef(null);
  const [image, setImage] = useState();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [id, setID] = useState("");
  const [page, setPage] = useState(0);
  const [noImage, setNoImage] = useState('');
  const [likes, setLikes] = useState(0);
  const [username, setUsername] = useState('');
  // const [name, setName] = useState("");


  useEffect(() => {
    let userCookie = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    fetch(`http://localhost:3001/api/art/user/${userCookie}/?page=${page}`, {
      method: "GET",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }).then(response => {
      if (response.status === 404) {
        setNoImage('No Posts')
      }
      if (response.status === 200) {
        response.json().then(j => {
          console.log(j)
          setLikes(j[0].likes)
          setTitle(j[0].title)
          setDesc(j[0].description)
          setID(j[0]._id)
          setUsername(j[0].username)
          // setName(j[0].name)
          //console.log(j[0].likes)
          setImage(`http://localhost:3001/api/art/${j[0]._id}`)
        })
      }
    })
  }, []);

  function sendDelete() {
    fetch(`http://localhost:3001/api/items/${id}/`, {
      method: 'DELETE',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(response => {
        if (response.ok) {
          console.log('Item deleted successfully');
          window.location.reload();
        } else {
          console.log('Failed to delete item');
        }
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }

  function changePrevData() {
    let userCookie = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    let n = page - 1
    if (n < 0) {

    } else {
      fetch(`http://localhost:3001/api/art/user/${userCookie}/?page=${n}`, {
        method: "GET",
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }).then(response => {
        if (response.status === 200) {
          response.json().then(j => {
            console.log(j)
            setTitle(j[0].title)
            setDesc(j[0].description)
            setLikes(j[0].likes)
            setID(j[0]._id)
            setUsername(j[0].username)
            setImage(`http://localhost:3001/api/art/${j[0]._id}`)
            setPage(n)
            // setName(j[0].name)
          })
        }
      })
    }
  }

  function changeNextData() {
    let userCookie = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    let n = page + 1
    fetch(`http://localhost:3001/api/art/user/${userCookie}/?page=${n}`, {
      method: "GET",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }).then(response => {
      if (response.status === 200) {
        response.json().then(j => {
          console.log(j)
          setTitle(j[0].title)
          setDesc(j[0].description)
          setLikes(j[0].likes)
          setID(j[0]._id)
          setUsername(j[0].username)
          setImage(`http://localhost:3001/api/art/${j[0]._id}`)
          setPage(n)
          // setName(j[0].name)
        })
      }
    })
  }

  function updateLike() {

    let n = likes + 1

    fetch(`http://localhost:3001/api/art/${id}/`, {
      method: "PATCH",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }).then(response => {
      if (response.status === 200) {
        setLikes(n)

      }
    })
  }

  return (
    <main id="studiospace-container">
      <h1>Studio Space</h1>
      <div id="btn-container">
        <div>
          <button onClick={() => nav('/addart')}>Add Artwork</button>
        </div>
        <div>
          <button onClick={() => nav('/editartwork', { state: { "_id": id } })}>Edit Artwork</button>
        </div>
        <div >
          <button onClick={() => sendDelete()} >Delete Artwork</button>
        </div>
      </div>
      <div><h1>{noImage}</h1></div>
      {/* <div><h1>{name}</h1></div> */}
      <div><h2>{username}</h2></div>
      <div><img src={image} width="400"/></div>
      <div><h1>{title}</h1></div>
      <div><h2>{desc}</h2></div>
      <div class="likes">
        <button onClick={() => updateLike()}><i class="fa-sharp fa-solid fa-heart"></i><p>{likes}</p></button>
      </div>
      <div class="pages">
        <button onClick={() => changePrevData()}   ><i class="fa-solid fa-caret-left"></i> Prev</button>
        <button onClick={() => changeNextData()} >Next <i class="fa-solid fa-caret-right"></i></button>
      </div>

    </main>
  );
}