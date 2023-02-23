import { Button } from "react-bootstrap";
import SearchRecipe from "../SearchRecipe";
import "./index.scss";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Button
        variant="secondary"
        className="add-recipe"
        onClick={() => navigate("/add")}
      >
        Add recipe
      </Button>
      <SearchRecipe></SearchRecipe>
    </div>
  );
};

export default Home;
