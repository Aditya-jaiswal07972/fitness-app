import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useUpdateWaterIntakeMutation } from "../slices/usersApiSlice";
import { Box } from "@mui/material";
import "./WaterIntakeLog.css";

const WaterIntakeLog = () => {
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [totalWater, setTotalWater] = useState(0);
  const [loggedWater, setLoggedWater] = useState(0);

  const [updateWaterIntake] = useUpdateWaterIntakeMutation();

  useEffect(() => {
    const fetchWaterIntake = async () => {
      try {
        const response = await fetch(`/api/users/water-intake/${currentDate}`);
        const data = await response.json();

        setTotalWater(data.litersDrank);

        const waterIntakeData = JSON.stringify(data);
        localStorage.setItem("waterIntake", waterIntakeData);
      } catch (error) {
        console.error("Fetch water intake error:", error);
      }
    };

    // Load the water intake from local storage
    const storedWaterIntake = localStorage.getItem("waterIntake");
    if (storedWaterIntake) {
      const parsedWaterIntake = JSON.parse(storedWaterIntake);
      setTotalWater(parsedWaterIntake.litersDrank);
    } else {
      fetchWaterIntake();
    }
  }, []);

  const handleChange = (event) => {
    const { value } = event.target;
    setLoggedWater(parseFloat(value));
  };

  const handleUpdate = async (increment) => {
    try {
      const newTotalWater = increment
        ? totalWater + loggedWater
        : Math.max(0, totalWater - loggedWater); // Ensure totalWater doesn't go below 0

      const waterIntakeData = {
        litersDrank: newTotalWater,
      };

      // Save the water intake to local storage
      localStorage.setItem("waterIntake", JSON.stringify(waterIntakeData));

      const updatedWaterIntake = await updateWaterIntake(
        waterIntakeData
      ).unwrap();

      if (updatedWaterIntake) {
        toast.success("Water intake updated successfully!");
        setTotalWater(updatedWaterIntake.litersDrank);
        setLoggedWater(0);
      }
    } catch (error) {
      toast.error("Failed to save the water intake.");
      console.error("Save water intake error:", error);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <div className="water-intake-log">
          <h2 className="water-intake-log__total">
            Water to be consumed for today: {totalWater} litres
          </h2>
          <Form className="water-intake-log__form">
            <Form.Label
              className="water-intake-log__label"
              htmlFor="loggedWater"
            >
              Log water consumed (in litres):
              <Form.Control
                type="number"
                min="0"
                step="0.05"
                value={loggedWater}
                onChange={handleChange}
                className="water-intake-log__input"
              />
            </Form.Label>
            <Button
              type="button"
              className="water-intake-log__button mx-2"
              onClick={() => handleUpdate(true)}
            >
              Add
            </Button>
            <Button
              type="button"
              className="water-intake-log__button mx-2"
              onClick={() => handleUpdate(false)}
            >
              Subtract
            </Button>
          </Form>
        </div>
      </Box>
    </>
  );
};

export default WaterIntakeLog;
