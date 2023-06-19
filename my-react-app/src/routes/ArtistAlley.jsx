// import { Link } from "react-router-dom";
import HeaderMain from "../components/HeaderMain";
import ArtistAlleyInfo from "../components/ArtistAlleyInfo";
// import AddArtwork from "../components/AddArtwork";
// import AddSale from "../components/AddSale";
import Footer from "../components/footer";


export function ArtistAlley() {
  return (
    <main id="main">
      <HeaderMain />
      <ArtistAlleyInfo />
      <Footer />
      {/* <AddSale /> */}
    </main>
  );
}