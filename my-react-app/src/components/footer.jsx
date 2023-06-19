import Nav from "./Nav";
import {NavLink} from "react-router-dom";

export default function footer() {
  return (
    <footer id="footer-name">
      <div>
        <NavLink to="/homefeed">Artist Network <i class="fa-solid fa-pencil"></i></NavLink>
      </div>
      <div class="social-icons">
          <a href='twitter.com'><i class="fa-brands fa-twitter"></i></a>
          <a href='facebook.com'><i class="fa-brands fa-facebook"></i></a>
          <a href='instagram.com'><i class="fa-brands fa-instagram"></i></a>
          </div>
      <div>
        <p>© Copyright 2023 Artist Network</p>
      </div>
    </footer>
    
  )
}