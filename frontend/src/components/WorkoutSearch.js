import React, { useState } from "react";
import { Form, FormGroup, FormLabel, FormControl, Button, Table } from "react-bootstrap";

const CalorieCalculator = ({ onViewChange }) => {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("male");
  const [showResults, setShowResults] = useState(false);
  const [showSupplements, setShowSupplements] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const calculateCalories = (e) => {
    e.preventDefault();

    let bmr = 0;
    if (gender === "male") {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }

    bmr = Math.trunc(bmr);
    const deficitCalories = bmr - 500;
    const maintenanceCalories = bmr;
    const bulkingCalories = bmr + 500;

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

    setResults({
      bmr: bmr.toFixed(2),
      deficit: deficitCalories.toFixed(2),
      maintenance: maintenanceCalories.toFixed(2),
      bulking: bulkingCalories.toFixed(2),
      bmi: bmi,
      weightCategory: weightCategory,
    });

    setShowResults(true);
    onViewChange("results"); // Switch to results view
  };

  const handleSupplementsClick = () => {
    setShowForm(false);
    setShowResults(false);
    setShowSupplements(true);
    onViewChange("supplements"); // Switch to supplements view
  };

  const [results, setResults] = useState({
    bmr: "",
    deficit: "",
    maintenance: "",
    bulking: "",
    bmi: "",
    weightCategory: "",
  });

  const getSupplements = () => {
    const { weightCategory, bmi } = results;

    return (
      <div>
        {weightCategory === "Underweight" ? (
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
                <td>Mass Gainer</td>
                <td>1 serving per day</td>
              </tr>
              <tr>
                <td>Creatine</td>
                <td>5g daily</td>
              </tr>
            </tbody>
          </Table>
        ) : weightCategory === "Overweight" || bmi >= 25 ? (
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
                <td>CLA</td>
                <td>2-3 servings per day</td>
              </tr>
              <tr>
                <td>Fat Burners</td>
                <td>As per instructions</td>
              </tr>
            </tbody>
          </Table>
        ) : (
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
        )}
      </div>
    );
  };

  return (
    <div className="calorie-calculator">
      {showForm && !showSupplements && !showResults ? (
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
                <td>{results.bmr}</td>
              </tr>
              <tr>
                <td>Deficit</td>
                <td>{results.deficit}</td>
              </tr>
              <tr>
                <td>Maintenance</td>
                <td>{results.maintenance}</td>
              </tr>
              <tr>
                <td>Bulking</td>
                <td>{results.bulking}</td>
              </tr>
              <tr>
                <td>BMI</td>
                <td>{results.bmi}</td>
              </tr>
              <tr>
                <td>Weight Category</td>
                <td>{results.weightCategory}</td>
              </tr>
            </tbody>
          </Table>
          <Button onClick={handleSupplementsClick} className="mt-3">
            View Required Supplements
          </Button>
        </>
      ) : showSupplements ? (
        getSupplements()
      ) : null}
    </div>
  );
};

export default CalorieCalculator;
