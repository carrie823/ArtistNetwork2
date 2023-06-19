import { Link } from "react-router-dom";
// import HeaderMain from "./HeaderMain";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SaleFeed() {

  const nav = useNavigate();

  // const artRef = useRef(null);
  const [image, setImage] = useState();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [website, setLink] = useState("");
  const [id, setID] = useState("");
  const [page, setPage] = useState(0);
  const [noImage, setNoImage] = useState('');
  const [likes, setLikes] = useState(0);
  const [artist, setArtist] = useState();

  useEffect(() => {
    // var temp = send("")

    fetch(`http://localhost:3001/api/sale/?page=${page}`, {
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
          setLink(j[0].link)
          setID(j[0]._id)
          setArtist(j[0].username)
          setLink(j[0].link)
          setImage(`http://localhost:3001/api/sale/${j[0]._id}`)
        })
      }
    })
  }, []);

  function shopSite() {
    window.location.href = `${website}`;
    return null;
  }

  function changePrevData() {
    let n = page - 1
    if (n < 0) {

    } else {
      fetch(`http://localhost:3001/api/sale/?page=${n}`, {
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
            setLikes(j[0].likes)
            setTitle(j[0].title)
            setDesc(j[0].description)
            setID(j[0]._id)
            setLink(j[0].link)
            setArtist(j[0].username)
            setImage(`http://localhost:3001/api/sale/${j[0]._id}`)
            setPage(n)
          })
        }
      })
    }
  }

  function changeNextData() {
    let n = page + 1
    fetch(`http://localhost:3001/api/sale/?page=${n}`, {
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
          setLikes(j[0].likes)
          setTitle(j[0].title)
          setDesc(j[0].description)
          setID(j[0]._id)
          setLink(j[0].link)
          setArtist(j[0].username)
          setImage(`http://localhost:3001/api/sale/${j[0]._id}`)
          setPage(n)
        })
      }
    })
  }

  function updateLike() {

    let n = likes + 1

    fetch(`http://localhost:3001/api/sale/${id}/`, {
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
    <main id="salefeed-container">
      <h1>Artwork for Sale</h1>
      <div class="pages">
        <button onClick={()=>changePrevData()}><i class="fa-solid fa-caret-left"></i> Prev</button>
        <button onClick={()=>changeNextData()}>Next <i class="fa-solid fa-caret-right"></i></button>
      </div>
      <div><h1>{noImage}</h1></div>
      <div id="sales-content">
        <div><strong><p>For Sale By: {artist}</p></strong></div>
        <img src={image} width="400"/>
        <div class="title"><strong><h1>{title}</h1></strong></div>
        <div><strong><p>{desc}</p></strong></div>
        {/* <div class="shop-btn"><a href={website}>Shop Here</a></div> */}
        <div class="shop-btn"><button onClick={() => shopSite()}>Shop Here</button></div>
        <div class="likes">
          <button onClick={() => updateLike()}><p>{likes}</p><i class="fa-sharp fa-solid fa-heart"></i></button>
        </div>
      </div>

    </main>
  );
  
}