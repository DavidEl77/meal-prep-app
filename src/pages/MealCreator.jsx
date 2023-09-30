import { TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MealCreator = () => {
  const [mealAmount, setMealAmount] = useState(null);
  const [calories, setCalories] = useState(null);
  const navigate = useNavigate();

  const createMealPlan = () => {
    sessionStorage.setItem("mealAmount", mealAmount);
    sessionStorage.setItem("calories", calories);
    navigate("/mealplan");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        color: "black",
        backgroundColor: "lightblue",
        borderRadius: "50px",
        height: "350px",
        width: "600px",
        padding: "50px",
        justifyContent: "space-around",
      }}
    >
      <Typography variant="h5">
        Enter Amount of Calories and Meals to Eat in a Day:
      </Typography>
      <TextField
        id="standard-number"
        label="Calories Amount"
        type="number"
        inputProps={{ min: 1000, max: 5000 }}
        initialLabelProps={{ shrink: true }}
        variant="standard"
        onChange={(e) => setCalories(e.target.value)}
      />
      <TextField
        id="standard-number"
        label="No. of Meals"
        type="number"
        inputProps={{ min: 1, max: 6 }}
        initialLabelProps={{ shrink: true }}
        variant="standard"
        onChange={(e) => setMealAmount(e.target.value)}
      />
      <Button onClick={createMealPlan} variant="contained">
        Get your meal plan!
      </Button>
    </div>
  );
};

export default MealCreator;
