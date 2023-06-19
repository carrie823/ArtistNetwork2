// import {Link} from "react-router-dom";
import Nav from "./Nav";
import {NavLink} from "react-router-dom";

export default function HeaderMain() {
  return (
    <header id="header">
      <h1 id="site-name">
      <NavLink to="/homefeed">Artist Network <i class="fa-solid fa-pencil"></i></NavLink>
      {/* <Link to="/">Artist Network</Link> */}
      </h1> 
        <Nav />
    </header>
    
  )
}