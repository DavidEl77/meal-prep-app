import { useState, useEffect } from "react";
import Meal from "../components/Meal";
import SideBar from "../components/SideBar";
import { getMealPlan, getSubtituteMeal } from "../serverAPI";
import { BallTriangle } from "react-loader-spinner";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";

const MealPlan = () => {
  const [mealPlan, setMealPlan] = useState([]);
  const [mealsIdToExclude, setMealsIdToExclude] = useState([]);
  const [mealPlanHistory, setMealPlanHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMealPlan = async () => {
    try {
      const mealPlan = await getMealPlan();
      setIsLoading(false);
      setMealPlan(mealPlan);
      const totalCalories = mealPlan.reduce((acc, meal) => {
        return acc + meal.calories;
      }, 0);
      sessionStorage.setItem("totalCalories", totalCalories);
      setMealsIdToExclude(mealPlan.map((meal) => meal.id));
    } catch (error) {
      setError(error);
    }
  };

  const substituteMeal = async (meal) => {
    try {
      setIsLoading(true);
      const newMeal = await getSubtituteMeal(meal.calories, mealsIdToExclude);
      if (newMeal) {
        const newMealPlan = mealPlan.map((mealPlanMeal) => {
          if (mealPlanMeal.id === meal.id) {
            return newMeal;
          } else {
            return mealPlanMeal;
          }
        });
        setMealPlan(newMealPlan);
        sessionStorage.setItem(
          "totalCalories",
          newMealPlan.reduce((acc, meal) => {
            return acc + meal.calories;
          }, 0)
        );
        setMealsIdToExclude([...mealsIdToExclude, newMeal.id]);
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
      {isLoading ? (
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <BallTriangle color="black" />
        </div>
      ) : (
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
              gap: "50px",
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
          <LibraryAddIcon
            onClick={() => {
              setMealPlanHistory([...mealPlanHistory, mealPlan]);
            }}
            style={{
              fontSize: "70px",
              cursor: "pointer",
              color: "white",
              backgroundColor: "black",
              borderRadius: "50%",
              padding: "5px",
              position: "fixed",
              top: "80px",
              right: "50px",
              "&:hover": { color: "lightblue" },
              "&:active": { color: "black" },
            }}
          />
        </div>
      )}
      <SideBar mealPlanHistory={mealPlanHistory} />
    </>
  );
};

export default MealPlan;
