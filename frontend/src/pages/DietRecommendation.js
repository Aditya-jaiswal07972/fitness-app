import { useState } from "react";
import MealList from "./MealList";
import "./DietRecommendation.css";
import Footer from "../components/Footer";


export default function DietRecommendation() {
  const [mealData, setMealData] = useState(null);
  const [calories, setCalories] = useState(2000);

  function getMealData() {
    fetch(
      `https://api.spoonacular.com/mealplanner/generate?apiKey=cb1c464d94f142c08b156c5beddade8b&timeFrame=day&targetCalories=${calories}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMealData(data);
      })
      .catch(() => {
        console.log("error");
      });
  }

  function handleChange(e) {
    setCalories(e.target.value);
  }

  return (
    <>
    <div className="DietApp">
      <section className="controls">
        <input
          type="number"
          placeholder="Calories (e.g. 2000)"
          onChange={handleChange}
          id="dietInput"
        />
        <button className="button-78" onClick={getMealData}>Get Daily Meal Plan</button>
      </section>
      {mealData && <MealList mealData={mealData} />}
    </div>
    <Footer />
    </>

  );
}
