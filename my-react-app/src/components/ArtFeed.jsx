// import { Link } from "react-router-dom";
// import HeaderMain from "./HeaderMain";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function ArtFeed() {
  const nav = useNavigate();
  // const artRef = useRef(null);
  const [image, setImage] = useState();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [id, setID] = useState("");
  const [page, setPage] = useState(0);
  const [noImage, setNoImage] = useState('');
  const [likes, setLikes] = useState(0);
  let userCookie = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  const [username, setUsername] = useState(userCookie);
  const [artist, setArtist] = useState();

  useEffect(() => {
    setUsername(userCookie)
    fetch(`http://localhost:3001/api/art/?page=${page}`, {
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
          //console.log(j[0].likes)
          setArtist(j[0].username)
          setImage(`http://localhost:3001/api/art/${j[0]._id}`)
        })
      }
    })
  }, []);

  function changePrevData() {
    let n = page - 1
    if (n < 0) {

    } else {
      fetch(`http://localhost:3001/api/art/?page=${n}`, {
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
            setArtist(j[0].username)
            setImage(`http://localhost:3001/api/art/${j[0]._id}`)
            setPage(n)
          })
        }
      })
    }
  }

  function changeNextData() {
    let n = page + 1
    fetch(`http://localhost:3001/api/art/?page=${n}`, {
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
          setArtist(j[0].username)
          setImage(`http://localhost:3001/api/art/${j[0]._id}`)
          setPage(n)
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
    <main id="artfeed-container">
      <div id="feed-heading">
        <h1>{username}'s Feed</h1>
      </div>
      <h1>Artwork Posts</h1>
      <div class="pages">
        <button onClick={()=>changePrevData()} ><i class="fa-solid fa-caret-left"></i> Prev</button>
        <button onClick={()=>changeNextData()} >Next <i class="fa-solid fa-caret-right"></i></button>
      </div>
      <div><h1>{noImage}</h1></div>
      <div id="artwork-content">
        <div><strong><p>Artwork By: {artist}</p></strong></div>
        <img src={image} width="400"/>
        <div class="title"><strong><h1>{title}</h1></strong></div>
        <div><strong><p>{desc}</p></strong></div>
        <div class="likes">
          <button onClick={() => updateLike()}><p>{likes}</p><i class="fa-sharp fa-solid fa-heart"></i></button>
        </div>
      </div>

    </main>
  );
  
}