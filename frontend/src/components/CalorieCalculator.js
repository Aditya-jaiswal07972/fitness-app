import React, { useState } from "react";
import "./calorie.css";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  Table,
} from "react-bootstrap";

const CalorieCalculator = ({onViewChange}) => {

  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("male");
  const [showResults, setShowResults] = useState(false);
  const [showSupplements, setShowSupplements] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const calculateCalories = (e) => {
    e.preventDefault();

    // Calculate BMR based on gender
    let bmr = 0;
    if (gender === "male") {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age); // For men
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age); // For women
    }

    bmr = Math.trunc(bmr);

    // Calculate Calories
    const deficitCalories = bmr - 500;
    const maintenanceCalories = bmr;
    const bulkingCalories = bmr + 500;

    // Calculate BMI and categorize weight
    const bmi = (weight / ((height / 100) ** 2)).toFixed(2);
    let weightCategory = "";
    if (bmi < 18.5) {
      weightCategory = "Underweight";
    } else if (bmi >= 18.5 && bmi < 24.9) {
      weightCategory = "Normal weight";
    } else if (bmi >= 25 && bmi < 29.9) {
      weightCategory = "Overweight";
    } else {
      weightCategory = "Obese";
    }

    // Set results and show table
    setResults({
      bmr: bmr.toFixed(2),
      deficit: deficitCalories.toFixed(2),
      maintenance: maintenanceCalories.toFixed(2),
      bulking: bulkingCalories.toFixed(2),
      bmi: bmi,
      weightCategory: weightCategory,
    });
    setShowResults(true); // Show results when calculation is done
    onViewChange("results"); // Switch to results view

  };

  const [results, setResults] = useState({
    bmr: "",
    deficit: "",
    maintenance: "",
    bulking: "",
    bmi: "",
    weightCategory: "",
  });

  // Function to handle the supplement button click
  const handleSupplementsClick = () => {
    setShowForm(false); // Hide form
    setShowResults(false); // Hide results table
    setShowSupplements(true); // Show supplement recommendations
    onViewChange("supplements"); // Switch to supplements view

  };

  // Supplement recommendations based on weight category and BMI
  const getSupplements = () => {
    const { weightCategory, bmi } = results;

    if (weightCategory === "Underweight") {
      return (
        <Table bordered className="style-form">
          <thead>
            <tr>
              <th>Supplement</th>
              <th>Recommended Dose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Whey Protein</td>
              <td>1-2 servings per day</td>
            </tr>
            <tr>
              <td>Mass Gainer</td>
              <td>1 serving per day</td>
            </tr>
            <tr>
              <td>Creatine</td>
              <td>5g daily</td>
            </tr>
          </tbody>
        </Table>
      );
    } else if (weightCategory === "Overweight" || bmi >= 25) {
      return (
        <Table bordered className="styled-form">
          <thead>
            <tr>
              <th>Supplement</th>
              <th>Recommended Dose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Whey Protein</td>
              <td>1-2 servings per day</td>
            </tr>
            <tr>
              <td>CLA (Conjugated Linoleic Acid)</td>
              <td>2-3 servings per day</td>
            </tr>
            <tr>
              <td>Fat Burners</td>
              <td>As per instructions</td>
            </tr>
          </tbody>
        </Table>
      );
    } else {
      return (
        <Table bordered className="styled-form">
          <thead>
            <tr>
              <th>Supplement</th>
              <th>Recommended Dose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Whey Protein</td>
              <td>1-2 servings per day</td>
            </tr>
            <tr>
              <td>Multivitamins</td>
              <td>1 serving per day</td>
            </tr>
            <tr>
              <td>Omega-3 Fish Oil</td>
              <td>1-2 servings per day</td>
            </tr>
          </tbody>
        </Table>
      );
    }
  };

  return (
    <div className="calorie-calculator">
      {showForm && !showSupplements && !showResults ? (
        // If showForm is true, render the form
        <Form onSubmit={calculateCalories} className="styled-form">
          <FormGroup>
            <FormLabel htmlFor="age">Age: </FormLabel>
            <FormControl
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="weight">Weight (kg): </FormLabel>
            <FormControl
              type="number"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="height">Height (cm): </FormLabel>
            <FormControl
              type="number"
              id="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="gender">Gender: </FormLabel>
            <FormControl
              as="select"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </FormControl>
          </FormGroup>

          <Button type="submit" className="mb-3 mt-3">
            Calculate Calories
          </Button>
        </Form>
      ) : showResults && !showSupplements ? (
        // If showResults is true, render the results table
        <>
          <Table bordered className="styled-form">
            <thead>
              <tr>
                <th>Calorie Type</th>
                <th>Calories</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>BMR</td>
                <td data-testid="bmr">{results.bmr}</td>
              </tr>
              <tr>
                <td>Deficit</td>
                <td data-testid="deficit">{results.deficit}</td>
              </tr>
              <tr>
                <td>Maintenance</td>
                <td data-testid="maintenance">{results.maintenance}</td>
              </tr>
              <tr>
                <td>Bulking</td>
                <td data-testid="bulking">{results.bulking}</td>
              </tr>
              <tr>
                <td>BMI</td>
                <td data-testid="bmi">{results.bmi}</td>
              </tr>
              <tr>
                <td>Weight Category</td>
                <td data-testid="weightCategory">{results.weightCategory}</td>
              </tr>
            </tbody>
          </Table>
          <Button onClick={handleSupplementsClick} className="mt-3">
            View Required Supplements
          </Button>
        </>
      ) : showSupplements ? (
        // If showSupplements is true, show supplements table
        getSupplements()
      ) : null}
    </div>
  );
};

export default CalorieCalculator;
