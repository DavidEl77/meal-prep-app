import { useState } from "react";
import { Typography, Modal, Box, Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "black",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ meal, mealInfo, fetchMealInfo }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    fetchMealInfo();
  };
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        Click for Instructions
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            {meal.title}
          </Typography>
          <div
            id="modal-modal-description"
            style={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              marginTop: 7,
            }}
          >
            {mealInfo &&
              mealInfo.ingredients.map((ingredient) => {
                return (
                  <div key={ingredient.id}>
                    <strong>{ingredient.name}</strong> <br />
                    {`Amount: ${ingredient.amount} ${ingredient.unit}`} <br />
                  </div>
                );
              })}
            {mealInfo && mealInfo.instructions}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
