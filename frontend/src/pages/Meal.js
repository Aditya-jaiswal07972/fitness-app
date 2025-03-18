import React, { useState, useEffect } from "react";

export default function Meal({ meal }) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=cb1c464d94f142c08b156c5beddade8b&includeNutrition=false`
    )
      .then((response) => response.json())
      .then((data) => {
        setImageUrl(data.image);
      })
      .catch(() => {
        console.log("error");
      });
  }, [meal.id]);

  return (
<article
  id="dietCards"
  style={{
    background: "linear-gradient(90deg, rgba(248, 233, 166, 0.975) 50%, rgba(243, 255, 197, 0.89) 50%)",
    boxShadow: "0 0 10px 0 rgba(203, 214, 84, 0.867) ",
  }}
>
      <h1 className="mealHead2">{meal.title}</h1>
      <img src={imageUrl} alt="recipe" />
      <ul className="instructions1">
        <li>Preparation time: {meal.readyInMinutes} minutes</li>
        <li>Number of servings: {meal.servings}</li>
      </ul>

      <a href={meal.sourceUrl} id="dietLinks">Go to Recipe</a>
    </article>
  );
}