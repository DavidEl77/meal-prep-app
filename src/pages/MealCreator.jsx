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

  const handleMealAmountChange = (e) => {
    if (e.target.value > 5) {
      e.target.value = 5;
    } else if (e.target.value < 2) {
      e.target.value = 2;
    }

    setMealAmount(e.target.value);
  };

  const handleCaloriesChange = (e) => {
    if (e.target.value > 5000) {
      e.target.value = 5000;
    } else if (e.target.value < 1000) {
      e.target.value = 1000;
    }

    setCalories(e.target.value);
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
        onChange={handleCaloriesChange}
      />
      <TextField
        id="standard-number"
        label="No. of Meals"
        type="number"
        inputProps={{ min: 1, max: 5 }}
        initialLabelProps={{ shrink: true }}
        variant="standard"
        onChange={handleMealAmountChange}
      />
      <Button onClick={createMealPlan} variant="contained">
        Get your meal plan!
      </Button>
    </div>
  );
};

export default MealCreator;
