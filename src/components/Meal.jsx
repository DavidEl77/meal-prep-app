import { Typography } from "@mui/material";

const Meal = ({ meal }) => {
  //   const imgIdArr = meal.sourceUrl.split("-");
  //   const imgId = imgIdArr[imgIdArr.length - 1];

  return (
    <div style={{ margin: "40px" }}>
      <Typography
        style={{ margin: "10px", textDecoration: "underline" }}
        variant="h5"
      >
        {meal.title}
      </Typography>
      <img src={meal.image} alt={meal.title} />
      <div style={{ margin: "20px" }}>
        {`Calories: ${meal.calories}`} <br />
        {`Carbs: ${meal.carbs}`} <br />
        {`Fat: ${meal.fat}`} <br />
        {`Protein: ${meal.protein}`} <br />
      </div>
    </div>
  );
};

export default Meal;
