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
          <Typography id="modal-modal-description" sx={{ mt: 3 }}>
            {mealInfo && mealInfo.instructions}
            dada
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
