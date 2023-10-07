import { useState, useEffect } from "react";
import Meal from "../components/Meal";

const MealPlan = () => {
  const mealAmount = sessionStorage.getItem("mealAmount");
  const calories = sessionStorage.getItem("calories");
  const [mealPlan, setMealPlan] = useState([]);
  const [meals, setMeals] = useState([
    {
      title: "Meal 1",
      image: "https://spoonacular.com/recipeImages/716429-556x370.jpg",
      description: "This is a description",
      nutrients: { calories: 100, fat: 10, carbs: 20, protein: 30 },
    },
    {
      title: "Meal 2",
      image: "https://spoonacular.com/recipeImages/716429-556x370.jpg",
      description: "This is a description",
      nutrients: { calories: 200, fat: 15, carbs: 23, protein: 31 },
    },
    {
      title: "Meal 3",
      image: "https://spoonacular.com/recipeImages/716429-556x370.jpg",
      description: "This is a description",
      nutrients: { calories: 300, fat: 17, carbs: 22, protein: 33 },
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getMealPlan = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.spoonacular.com/mealplanner/generate?apiKey=0a973538b4084d2db83256900948a994&timeFrame=day&targetCalories=${calories}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // ApiKey: process.env.REACT_APP_SPOONACULAR_API_KEY
      const data = await response.json();
      setMealPlan(data);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    getMealPlan();
  }, []);

  console.log(mealPlan);

  return (
    <>
      {mealPlan?.meals?.map((meal) => {
        return <Meal key={meal.id} meal={meal} />;
      })}
    </>
  );
};

export default MealPlan;
