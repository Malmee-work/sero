import "./App.scss";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AddRecipe from "./pages/AddRecipe";
import Home from "./pages/Home";
import RecipeDetails from "./pages/Recipe";

const App = () => {
  return (
    <div className="App-header">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddRecipe />} />
          <Route path="/:recipeId" element={<RecipeDetails />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
