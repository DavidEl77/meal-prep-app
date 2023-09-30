import React from "react";
import { Typography } from "@mui/material";

const Meal = ({ meal }) => {
  return (
    <>
      <Typography variant="h5">{meal.title}</Typography>
      <img src={meal.image} alt={meal.title} />
      <div>{meal.description}</div>
      <div>{meal.nutrients}</div>
    </>
  );
};

export default Meal;
