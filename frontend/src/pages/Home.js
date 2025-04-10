import React from "react";
import HeroBanner from "../components/HeroBanner";
import Footer from "../components/Footer";
import HomeContent from "../components/HomeContent";
import BgImage from "../assets/images/bgimage.jpg";
import ChatBot from "./ChatBot"

const Home = () => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${BgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "0",
          margin: "0",
          maxWidth: "100%",
          paddingTop: "40px",
        }}
      >
        <HeroBanner />
        <HomeContent />
        <ChatBot/>
      </div>
      <Footer />
    </>
  );
};

export default Home;
