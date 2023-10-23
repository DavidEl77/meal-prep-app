import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import Meal from "../components/Meal";
import { getMealPlan, getSubtituteMeal } from "../serverAPI";
import { BallTriangle } from "react-loader-spinner";

const MealPlan = () => {
  const [mealPlan, setMealPlan] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMealPlan = async () => {
    try {
      const mealPlan = await getMealPlan();
      setIsLoading(false);
      setMealPlan(mealPlan);
    } catch (error) {
      setError(error);
    }
  };

  const substituteMeal = async (meal) => {
    try {
      setIsLoading(true);
      const newMeal = await getSubtituteMeal(meal.calories, mealPlan);
      if (newMeal) {
        const newMealPlan = mealPlan.map((mealPlanMeal) => {
          if (mealPlanMeal.id === meal.id) {
            return newMeal;
          } else {
            return mealPlanMeal;
          }
        });
        setMealPlan(newMealPlan);
      }
      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchMealPlan();
  }, []);

  return (
    <>
      {error && <div>{error}</div>}
      <Typography variant="h3" color={"chocolate"}>
        Meal Plan
      </Typography>
      {isLoading ? (
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <BallTriangle color="white" />
        </div>
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            {mealPlan &&
              mealPlan.map((meal) => {
                return (
                  <Meal
                    key={meal.id}
                    meal={meal}
                    substituteMeal={substituteMeal}
                  />
                );
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
        </div>
      )}
    </>
  );
};

export default MealPlan;
