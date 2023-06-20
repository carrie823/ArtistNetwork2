import {NavLink} from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Nav() {

  const nav = useNavigate();
  function sendData() {
    fetch(`http://artbycnstudio.com/api/signout`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        nav('/')
      }
    })
  }
  


  return (
    <nav id="main-nav" aria-label="Main navigation">
      
      <ul>
        <li>
          <NavLink to="/homefeed"> Home Feed </NavLink> 
        </li>
        <li>
          <NavLink to="/studiospace">Studio Space</NavLink>
        </li>
        <li>
          <NavLink to="/artistalley">Artist Alley</NavLink>
        </li>
        <li>
          <NavLink to="/search">Search</NavLink>
        </li>
        <li>
          <button onClick={() => sendData()}>Logout</button>
        </li>
      </ul>
    </nav>
  );
}
