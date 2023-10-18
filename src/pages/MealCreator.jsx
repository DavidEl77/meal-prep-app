import {
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const MealCreator = () => {
  // user inputs useState
  const [mealAmount, setMealAmount] = useState(null);
  const [calories, setCalories] = useState(null);
  // error handling useState
  const [isCaloriesTooLow, setIsCaloriesTooLow] = useState(false);
  const [isCaloriesTooHigh, setIsCaloriesTooHigh] = useState(false);
  const [isMealsTooLow, setIsMealsTooLow] = useState(false);
  const [isMealsTooHigh, setIsMealsTooHigh] = useState(false);
  // diet type/preferences useState
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isDairyFree, setIsDairyFree] = useState(false);
  // const [isKetogenic, setIsKetogenic] = useState(false);
  // const [isPaleo, setIsPaleo] = useState(false);

  const navigate = useNavigate();

  // Function to create meal plan
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

  // Button Ref for handling Enter key press
  const buttonRef = useRef(null);
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      buttonRef.current.click();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        color: "black",
        backgroundColor: "lightblue",
        borderRadius: "50px",
        height: "70vh",
        width: "60vw",
        padding: "50px",
        justifyContent: "space-around",
        gap: "20px",
      }}
    >
      <Typography variant="h5">
        Enter Amount of Calories and Meals to Eat in a Day:
      </Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          gap: "20px",
        }}
      >
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
      </div>
      <Typography variant="h5">Select Diet Type/Preferences:</Typography>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          padding: "20px",
          justifyContent: "center",
          justifyItems: "center",
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={isVegetarian}
              onChange={(e) => {
                setIsVegetarian(e.target.checked);
                setIsVegan(false);
              }}
            />
          }
          label="Vegetarian"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isGlutenFree}
              onChange={(e) => setIsGlutenFree(e.target.checked)}
            />
          }
          label="Gluten Free"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isVegan}
              onChange={(e) => {
                setIsVegan(e.target.checked);
                setIsVegetarian(false);
              }}
            />
          }
          label="Vegan"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isDairyFree}
              onChange={(e) => setIsDairyFree(e.target.checked)}
            />
          }
          label="Dairy Free"
        />
      </div>
      <Button
        onClick={createMealPlan}
        variant="contained"
        ref={buttonRef}
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
