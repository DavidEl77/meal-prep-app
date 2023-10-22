import { useState } from "react";
import { Typography } from "@mui/material";
import Modal from "../components/Modal";
import { getMealInfo } from "../serverAPI";
import AutorenewIcon from "@mui/icons-material/Autorenew";

const Meal = ({ meal, substituteMeal }) => {
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
    <div style={{ margin: "40px", width: "250px" }}>
      <Typography
        style={{ margin: "10px", textDecoration: "underline" }}
        variant="h5"
      >
        {meal.title}
      </Typography>

      <div style={{ display: "inline-block", position: "relative" }}>
        <img src={meal.image} alt={meal.title} />
        <AutorenewIcon
          onClick={() => substituteMeal(meal)}
          sx={{
            backgroundColor: "black",
            position: "absolute",
            right: 0,
            margin: "10px",
            borderRadius: "50%",
            cursor: "pointer",
            "&:hover": { backgroundColor: "white", color: "black" },
            "&:active": { backgroundColor: "black", color: "white" },
          }}
        />
      </div>
      <br />
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
