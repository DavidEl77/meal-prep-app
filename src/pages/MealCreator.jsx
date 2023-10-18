import { TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MealCreator = () => {
  const [mealAmount, setMealAmount] = useState(null);
  const [calories, setCalories] = useState(null);
  const [isCaloriesTooLow, setIsCaloriesTooLow] = useState(false);
  const [isCaloriesTooHigh, setIsCaloriesTooHigh] = useState(false);
  const [isMealsTooLow, setIsMealsTooLow] = useState(false);
  const [isMealsTooHigh, setIsMealsTooHigh] = useState(false);
  const navigate = useNavigate();

  const createMealPlan = () => {
    if (
      calories < 1500 ||
      calories > 5000 ||
      mealAmount < 2 ||
      mealAmount > 5
    ) {
      if (calories < 1500) {
        setIsCaloriesTooLow(true);
      }
      if (calories >= 1500) {
        setIsCaloriesTooLow(false);
      }
      if (calories > 5000) {
        setIsCaloriesTooHigh(true);
      }
      if (calories <= 5000) {
        setIsCaloriesTooHigh(false);
      }
      if (mealAmount < 2) {
        setIsMealsTooLow(true);
      }
      if (mealAmount >= 2) {
        setIsMealsTooLow(false);
      }
      if (mealAmount > 5) {
        setIsMealsTooHigh(true);
      }
      if (mealAmount <= 5) {
        setIsMealsTooHigh(false);
      }
      return;
    } else {
      parseInt(sessionStorage.setItem("mealAmount", mealAmount));
      parseInt(sessionStorage.setItem("calories", calories));
      navigate("/mealplan");
    }
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
        error={isCaloriesTooHigh || isCaloriesTooLow}
        id={
          isCaloriesTooHigh || isCaloriesTooLow
            ? "standard-number-error-helper-text"
            : "standard-number"
        }
        helperText={
          isCaloriesTooHigh
            ? "Maximum amount of calories is 5000"
            : isCaloriesTooLow
            ? "Minimum amount of calories is 1500"
            : ""
        }
        label="Calories Amount (1500-5000)"
        type="number"
        initialLabelProps={{ shrink: true }}
        variant="standard"
        onChange={(e) => setCalories(e.target.value)}
      />
      <TextField
        error={isMealsTooHigh || isMealsTooLow}
        id={
          isMealsTooHigh || isMealsTooLow
            ? "standard-number-error-helper-text"
            : "standard-number"
        }
        helperText={
          isMealsTooHigh
            ? "Maximum amount of meals is 5"
            : isMealsTooLow
            ? "Minimum amount of meals is 2"
            : ""
        }
        label="No. of Meals (2-5)"
        type="number"
        initialLabelProps={{ shrink: true }}
        variant="standard"
        onChange={(e) => setMealAmount(e.target.value)}
      />
      <Button
        onClick={createMealPlan}
        variant="contained"
        // disabled={
        //   calories < 1500 || calories > 5000 || mealAmount < 2 || mealAmount > 5
        // }
      >
        Get your meal plan!
      </Button>
    </div>
  );
};

export default MealCreator;
