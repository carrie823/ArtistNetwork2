// import { Link } from "react-router-dom";
import HeaderMain from "../components/HeaderMain";
import StudioSpaceInfo from "../components/StudioSpaceInfo";
// import AddArtwork from "../components/AddArtwork";
import Footer from "../components/footer";

export function StudioSpace() {
  return (
    <main id="main">
      <HeaderMain />
      <StudioSpaceInfo />
      {/* <AddArtwork /> */}
      <Footer />
    </main>
  );
}