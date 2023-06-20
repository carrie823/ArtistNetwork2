import { Link } from "react-router-dom";
// import HeaderMain from "./HeaderMain";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ArtistAlleyInfo() {

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
  const [name, setName] = useState("");
  const [username, setUsername] = useState('');

  useEffect(() => {
    // var temp = send("")
    let userCookie = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    fetch(`http://artbycnstudio.com/api/sale/user/${userCookie}/?page=${page}`, {
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
          setName(j[0].name)
          setUsername(j[0].username)
          setImage(`http://artbycnstudio.com/api/sale/${j[0]._id}`)
        })
      }
    })
  }, []);

  function sendDelete() {
    fetch(`http://artbycnstudio.com/api/items/sale/${id}/`, {
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

  function shopSite() {
    window.location.href = `${website}`;
    // return null;
  }

  function changePrevData() {
    let userCookie = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    let n = page - 1
    if (n < 0) {

    } else {
      fetch(`http://artbycnstudio.com/api/sale/user/${userCookie}/?page=${n}`, {
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
            setName(j[0].name)
            setUsername(j[0].username)
            setImage(`http://artbycnstudio.com/api/sale/${j[0]._id}`)
            setPage(n)
          })
        }
      })
    }
  }

  function changeNextData() {
    let userCookie = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    let n = page + 1
    fetch(`http://artbycnstudio.com/api/sale/user/${userCookie}/?page=${n}`, {
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
          setName(j[0].name)
          setUsername(j[0].username)
          setImage(`http://artbycnstudio.com/api/sale/${j[0]._id}`)
          setPage(n)
        })
      }
    })
  }

  function updateLike() {

    let n = likes + 1

    fetch(`http://artbycnstudio.com/api/sale/${id}/`, {
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
    <main id="artistalley-container">
      <h1>Artist Alley</h1>
      <div id="btn-container2">
        <div>
          <button onClick={() => nav('/addsales')}>Add Sale</button>
        </div>
        <div>
          <button onClick={() => nav('/editsale', { state: { "_id": id } })}>Edit Sale</button>
        </div>
        <div >
          <button onClick={() => sendDelete()}>Delete Sale</button>
        </div>
      </div>
      <div><h1>{noImage}</h1></div>
      <div><h2>{username}</h2></div>
      <div><img src={image} width="400" /></div>
      <div><h1>{title}</h1></div>
      <div><h2>{desc}</h2></div>
      {/* <div><button onClick={() => shopSite()}>Shop Here</button></div> */}
      {/* <button class="shop-btn"><a href={website}>Shop Here</a></button> */}
      <div class="shop-btn"><button onClick={() => shopSite()}>Shop Here</button></div>
      <div class="likes"><button onClick={() => updateLike()}><i class="fa-sharp fa-solid fa-heart"></i><p>{likes}</p></button></div>
      <div class="pages">
        <button onClick={() => changePrevData()}><i class="fa-solid fa-caret-left"></i> Prev</button>
        <button onClick={() => changeNextData()}>Next <i class="fa-solid fa-caret-right"></i></button>
      </div>

    </main>
  );
}