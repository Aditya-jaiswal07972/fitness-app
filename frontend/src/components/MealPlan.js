import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  useCreateMealPlanMutation,
  useUpdateMealPlanMutation,
} from "../slices/usersApiSlice";
import "./Profile.css";

const MealPlan = () => {
  const [currentDate, setCurrentDate] = useState(
    new Date().toLocaleDateString("en-CA")
  );

  const [meal1, setMeal1] = useState("");
  const [meal2, setMeal2] = useState("");
  const [meal3, setMeal3] = useState("");
  const [meal4, setMeal4] = useState("");
  const [meal5, setMeal5] = useState("");
  const [snacks, setSnacks] = useState("");

  const [createMealPlan] = useCreateMealPlanMutation();
  const [updateMealPlan] = useUpdateMealPlanMutation();

  useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        const response = await fetch(`/api/user/meal-plan/${currentDate}`);
        const data = await response.json();
        setMeal1(data.meal1 || "");
        setMeal2(data.meal2 || "");
        setMeal3(data.meal3 || "");
        setMeal4(data.meal4 || "");
        setMeal5(data.meal5 || "");
        setSnacks(data.snacks || "");
      } catch (error) {
        console.error("Fetch meal plan error:", error);
      }
    };

    fetchMealPlan();
  }, [currentDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const mealPlanData = {
        date: currentDate,
        meal1,
        meal2,
        meal3,
        meal4,
        meal5,
        snacks,
      };

      const existingMealPlan = await updateMealPlan(mealPlanData).unwrap();
      if (existingMealPlan) {
        toast.success("Meal plan updated successfully!");
      } else {
        await createMealPlan(mealPlanData).unwrap();
        toast.success("Meal plan created successfully!");
      }
    } catch (error) {
      toast.error("Failed to save the meal plan.");
      console.error("Save meal plan error:", error);
    }
  };

  return (
    <div className="meal-plan-container">
      <div className="meal-plan-card">
        <h2 className="meal-plan-title head1">Meal Plan</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="date" className="form-group">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={currentDate}
              onChange={(e) => setCurrentDate(e.target.value)}
              className="form-control-custom"
            />
          </Form.Group>

          {[
            { id: "meal1", label: "Meal 1", value: meal1, setter: setMeal1 },
            { id: "meal2", label: "Meal 2", value: meal2, setter: setMeal2 },
            { id: "meal3", label: "Meal 3", value: meal3, setter: setMeal3 },
            { id: "meal4", label: "Meal 4", value: meal4, setter: setMeal4 },
            { id: "meal5", label: "Meal 5", value: meal5, setter: setMeal5 },
            { id: "snacks", label: "Snacks", value: snacks, setter: setSnacks },
          ].map(({ id, label, value, setter }) => (
            <Form.Group controlId={id} className="form-group" key={id}>
              <Form.Label>{label}</Form.Label>
              <Form.Control
                type="text"
                placeholder={`Enter ${label}`}
                value={value}
                onChange={(e) => setter(e.target.value)}
                className="form-control-custom"
              />
            </Form.Group>
          ))}

          <Button type="submit" className="save-button">
            Save
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default MealPlan;
