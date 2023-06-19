// import Nav from "./Nav";
import { Link } from "react-router-dom";
import HeaderMain from "./HeaderMain";
import Footer from "./footer";
import ArtFeed from "./ArtFeed";
import SaleFeed from "./SaleFeed";

export function Home() {
  return (
    <main id="home-content">
      <HeaderMain />
      <div id="hero-container">
        <h1>
          Welcome to Artist Network
        </h1>
        <h2>
          Where artists can share and sell artwork 
        </h2>
      </div>
      <div id="feed-container">
        {/* <h1>
          Your Feed
        </h1> */}
        <ArtFeed/>
        <SaleFeed/>
      </div>
      {/* <div class="pages">
        <button><i class="fa-solid fa-caret-left"></i> Prev</button>
        <button>Next<i class="fa-solid fa-caret-right"></i></button>
      </div> */}
        <Footer />
    </main>
    
  )
}