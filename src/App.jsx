import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MealCreator from "./pages/MealCreator";
import MealPlan from "./pages/MealPlan";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={MealCreator} />
        <Route path="/mealplan" Component={MealPlan} />
      </Routes>
    </Router>
  );
}

export default App;
