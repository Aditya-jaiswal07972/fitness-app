import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import CalorieCalculator from "../components/CalorieCalculator";
import FormContainer from "../components/FormContainer";
import Footer from "../components/Footer";
import BgImage from "../assets/images/bgimage.jpg";

const BMRCalculator = () => {
  const [currentView, setCurrentView] = useState("form"); // State to manage the current view

  const handleViewChange = (view) => {
    setCurrentView(view); // Update the view state (form, results, or supplements)
  };

  const getHeadingText = () => {
    switch (currentView) {
      case "form":
        return "BMR Calculator";
      case "results":
        return "BMR Results";
      case "supplements":
        return "Required Supplements";
      default:
        return "BMR Calculator";
    }
  };

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
          maxHeight: "100%",
          paddingBottom: "20px",
        }}
      >
        <FormContainer>
          <Box
            sx={{
              padding: "2rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "68vh",
            }}
          >
            {/* Dynamic heading based on current view */}
            <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
              <h2>{getHeadingText()}</h2>
            </Typography>

            {/* Pass the function to update view to the CalorieCalculator component */}
            <CalorieCalculator onViewChange={handleViewChange} />
          </Box>
        </FormContainer>
      </div>

      <Footer />
    </>
  );
};

export default BMRCalculator;
