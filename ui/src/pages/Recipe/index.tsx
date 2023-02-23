import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useGetRecipesQuery } from "../../store/api-slice";
import { Recipe } from "../../types/recipe";
import "./index.scss";

const RecipeDetails: React.FC = () => {
  let { recipeId } = useParams();
  const navigate = useNavigate();
  const { data: recipesList } = useGetRecipesQuery(undefined);
  const [recipe, setRecipe] = useState<Recipe>();
  useEffect(() => {
    if (recipeId && recipesList) {
      setRecipe(recipesList.find((recipe: Recipe) => recipe._id === recipeId));
    }
  }, [recipeId, recipesList]);

  return (
    <div>
      <Button
        variant="secondary"
        className="back-button"
        onClick={() => navigate("/")}
      >
        Back
      </Button>
      <div>
        {recipe ? (
          <div className="recipe">
            <p className="recipe-name" data-test-id="view-recipe-name">Recipe: {recipe.name}</p>
            <p className="recipe-sub-title">Ingredients</p>
            {recipe.ingredients ? (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Ingredient</th>
                    <th>Units</th>
                    <th>Measurement</th>
                  </tr>
                </thead>
                <tbody>
                  {recipe.ingredients.map((ingredient, index) => {
                    return (
                      <tr key={`ingredient${index}`}>
                        <td>{index + 1}</td>
                        <td data-test-id={`view-recipe-ingredient-name-${index}`}>{ingredient.ingredient}</td>
                        <td>{ingredient.amount}</td>
                        <td>{ingredient.measurement}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            ) : (
              <p>No ingredients</p>
            )}
            <p className="recipe-sub-title">Methods</p>
            {recipe.methods ? (
              recipe.methods.map((method, index) => {
                return (
                  <p key={`method${index}`} data-test-id={`view-recipe-method-name-${index}`}>
                    {index + 1}. {method}
                  </p>
                );
              })
            ) : (
              <p>No methods</p>
            )}
          </div>
        ) : (
          <p>No recipe found</p>
        )}
      </div>
    </div>
  );
};

export default RecipeDetails;
