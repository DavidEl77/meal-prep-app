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
    <div
      style={{
        width: "250px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        height: "500px",
        gap: "10px",
      }}
    >
      <div
        style={{
          height: 50,
          overflowY: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h3>{meal.title}</h3>
      </div>

      <div style={{ position: "relative" }}>
        <img
          src={meal.image}
          alt={meal.title}
          style={{
            width: "250px",
            height: "200px",
          }}
        />
        <AutorenewIcon
          onClick={() => substituteMeal(meal)}
          sx={{
            backgroundColor: "black",
            color: "white",
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
      <Modal meal={meal} mealInfo={mealInfo} fetchMealInfo={fetchMealInfo} />
      <div style={{}}>
        <strong>{`Calories: ${meal.calories} (1 Serving)`}</strong> <br />
        {`Carbs: ${meal.carbs}`} <br />
        {`Fat: ${meal.fat}`} <br />
        {`Protein: ${meal.protein}`} <br />
      </div>
    </div>
  );
};

export default Meal;
