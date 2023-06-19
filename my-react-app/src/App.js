// import logo from './logo.svg';
// import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import { SignUp } from "./components/SignUp";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { StudioSpace } from "./routes/StudioSpace";
import { ArtistAlley } from "./routes/ArtistAlley";
import { AddArt } from "./routes/AddArt";
import { AddSales } from "./routes/AddSales";
import { EditArt } from "./routes/EditArt";
import { EditSale } from "./routes/EditSale";
import { SearchSS } from "./components/SearchSS";
// import { Footer } from "./components/footer";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Header /> */}
        <Routes>
          <Route path="/homefeed" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Login />} />
          <Route path="/studiospace" element={<StudioSpace />} />
          <Route path="/artistalley" element={<ArtistAlley />} />
          <Route path="/addart" element={<AddArt />} />
          <Route path="/addsales" element={<AddSales />} />
          <Route path="/editartwork" element={<EditArt />} />
          <Route path="/editsale" element={<EditSale />} />
          <Route path="/search" element={<SearchSS />} />
          {/* <Route path="/artistalley" element={<Project />} /> */}
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  )


}

export default App;
