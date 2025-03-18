import React from "react";
import { Box } from "@mui/material";
import BgImage from "../assets/images/bgimage.jpg";


import ExercisePage from "../components/ExerciseDB";
import Footer from "../components/Footer";

const Workouts = () => {
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
          backgroundRepeat: "no-repeat", // Ensure the image doesn't repeat
        }}


      >
        <ExercisePage />
      </Box>
      <Footer />
    </>
  );
};

export default Workouts;
