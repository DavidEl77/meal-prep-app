import { useState } from "react";
import { Typography } from "@mui/material";
import Modal from "../components/Modal";
import { getMealInfo } from "../serverAPI";

const Meal = ({ meal }) => {
  const [mealInfo, setMealInfo] = useState(null);
  const fetchMealInfo = async () => {
    try {
      const mealInfo = await getMealInfo(meal.id);
      setMealInfo(mealInfo);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ margin: "40px" }}>
      <Typography
        style={{ margin: "10px", textDecoration: "underline" }}
        variant="h5"
      >
        {meal.title}
      </Typography>
      <img src={meal.image} alt={meal.title} />
      <Modal meal={meal} mealInfo={mealInfo} fetchMealInfo={fetchMealInfo} />
      <div style={{ margin: "20px" }}>
        <strong>{`Calories: ${meal.calories} (1 Serving)`}</strong> <br />
        {`Carbs: ${meal.carbs}`} <br />
        {`Fat: ${meal.fat}`} <br />
        {`Protein: ${meal.protein}`} <br />
      </div>
    </div>
  );
};

export default Meal;
