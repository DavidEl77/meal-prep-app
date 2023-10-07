import { useState, useEffect } from "react";
import Meal from "../components/Meal";

const MealPlan = () => {
  const mealAmount = sessionStorage.getItem("mealAmount");
  const calories = sessionStorage.getItem("calories");
  const [mealPlan, setMealPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //   const getMealPlan = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await fetch(
  //         `https://api.spoonacular.com/mealplanner/generate?apiKey=0a973538b4084d2db83256900948a994&timeFrame=day&targetCalories=${calories}`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       // ApiKey: process.env.REACT_APP_SPOONACULAR_API_KEY
  //       const data = await response.json();
  //       setMealPlan(data);
  //       setLoading(false);
  //     } catch (error) {
  //       setError(error);
  //     }
  //   };

  const getBreakfast = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/findByNutrients?apiKey=0a973538b4084d2db83256900948a994&minCalories=${
          calories / 4
        }&minProtein=40&number=1`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setMealPlan(...MealPlan, { breakfast: data });
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  const getLunch = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=0a973538b4084d2db83256900948a994&minCalories=${
          calories / 2.5
        }&minProtein=40&number=1`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setMealPlan(...MealPlan, { lunch: data });
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  const getDinner = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=0a973538b4084d2db83256900948a994&minCalories=${
          calories - (calories / 4 + calories / 2.5)
        }&minProtein=40&number=1`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setMealPlan(...MealPlan, { dinner: data });
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    getBreakfast();
    getLunch();
    getDinner();
  }, []);

  console.log(mealPlan);

  return (
    <>
      {mealPlan?.map((meal) => {
        return <Meal key={meal.id} meal={meal} />;
      })}
    </>
  );
};

export default MealPlan;
