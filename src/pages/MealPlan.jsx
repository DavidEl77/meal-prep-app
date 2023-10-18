import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import Meal from "../components/Meal";
import { getMealPlan } from "../serverAPI";

const MealPlan = () => {
  const [mealPlan, setMealPlan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMealPlan = async () => {
    try {
      setLoading(true);
      const mealPlan = await getMealPlan();
      setLoading(false);
      setMealPlan(mealPlan);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchMealPlan();
  }, []);

  return (
    <>
      <Typography variant="h3" color={"chocolate"}>
        Meal Plan
      </Typography>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {mealPlan &&
          mealPlan.map((meal) => {
            return <Meal key={meal.id} meal={meal} />;
          })}
      </div>
      <div>
        <h3>
          Calories:{" "}
          {mealPlan &&
            mealPlan.reduce((acc, meal) => {
              return acc + meal.calories;
            }, 0)}
        </h3>
      </div>
    </>
  );
};

export default MealPlan;
