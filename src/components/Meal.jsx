import { Typography } from "@mui/material";

const Meal = ({ meal }) => {
  const imgIdArr = meal.sourceUrl.split("-");
  const imgId = imgIdArr[imgIdArr.length - 1];

  return (
    <div style={{ margin: "40px" }}>
      <Typography
        style={{ margin: "10px", textDecoration: "underline" }}
        variant="h5"
      >
        {meal.title}
      </Typography>
      <img
        src={`https://spoonacular.com/recipeImages/${imgId}-556x370.jpg`}
        alt={meal.title}
      />
      {/* <div>{meal.description}</div>
      <div style={{ margin: "20px" }}>
        {`Calories: ${meal.nutrients.calories}`} <br />
        {`Fat: ${meal.nutrients.fat}`} <br />
        {`Carbs: ${meal.nutrients.carbs}`} <br />
        {`Protein: ${meal.nutrients.protein}`} <br />
      </div> */}
    </div>
  );
};

export default Meal;
