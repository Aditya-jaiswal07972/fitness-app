import React from "react";
import { Box } from "@mui/material";
import BgImage from "../assets/images/bgimage.jpg";

import NutritionCheckerForm from "../components/NutritionCheckerForm";
import Footer from "../components/Footer";

const NutritionChecker = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          backgroundImage: `url(${BgImage})`, // Set the image as background
          backgroundSize: "cover", // Ensure the image covers the entire container
          backgroundPosition: "center", // Center the image
          backgroundRepeat: "no-repeat",
        }}
      >
        <NutritionCheckerForm />
      </Box>
      <Footer />
    </>
  );
};

export default NutritionChecker;
