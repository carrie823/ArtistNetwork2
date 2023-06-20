// import { Link } from "react-router-dom";
// import HeaderMain from "./HeaderMain";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import HeaderMain from "./HeaderMain";
import Footer from "../components/footer";

export function SearchSS() {
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
  const [search, setSearch] = useState('');
  // const [name, setName] = useState("");


  function refresh() {
    window.location.reload();
    // return null;
  }

  function changePrevData() {

    let n = page - 1
    if (n < 0) {

    } else {
      fetch(`http://artbycnstudio.com/api/art/user/${search}/?page=${n}`, {
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
            setImage(`http://artbycnstudio.com/api/art/${j[0]._id}`)
            setPage(n)
            // setName(j[0].name)
          })
        }
      })
    }
  }

  function changeNextData() {

    let n = page + 1
    fetch(`http://artbycnstudio.com/api/art/user/${search}/?page=${n}`, {
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
          setImage(`http://artbycnstudio.com/api/art/${j[0]._id}`)
          setPage(n)
          // setName(j[0].name)
        })
      }
    })
  }

  function updateLike() {

    let n = likes + 1

    fetch(`http://artbycnstudio.com/api/art/${id}/`, {
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

  function sendSearch() {
    let query = search
    fetch(`http://artbycnstudio.com/api/art/user/${query}/?page=${page}`, {
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
          setImage(`http://artbycnstudio.com/api/art/${j[0]._id}`)
        })
      }
    })
  }

  return (
    <main id="search-container">
      <HeaderMain />
      <h1>Search</h1>
        <div>
          <div class="fields">
                <label for="title">Search:</label>
                <input type="text" onChange={(event) => { setSearch(event.target.value) }} />
                <button onClick={() => sendSearch()} >Search</button>
                <button onClick={() => refresh()} >Clear </button>
            </div>
        </div>
        <div id="btn-container">
        </div>
        <div><h1>{noImage}</h1></div>
        {/* <div><h1>{name}</h1></div> */}
        <div><h2>{username}</h2></div>
        <div>
          <img src={image} width="400"/>
          <div class="likes">
          <button onClick={() => updateLike()}><i class="fa-sharp fa-solid fa-heart"></i><p>{likes}</p></button>
        </div>
        </div>
        <div><h1>{title}</h1></div>
        <div><h2>{desc}</h2></div>
        <div class="pages">
          <button onClick={() => changePrevData()}   ><i class="fa-solid fa-caret-left"></i> Prev</button>
          <button onClick={() => changeNextData()} >Next <i class="fa-solid fa-caret-right"></i></button>
      </div>
      <Footer/>
    </main>
  );
}