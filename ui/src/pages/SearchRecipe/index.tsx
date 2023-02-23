import "./index.scss";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Recipe } from "../../types/recipe";
import { useGetRecipesQuery } from "../../store/api-slice";
import { Ingredient } from "../../types/ingredient";
import { useNavigate } from "react-router-dom";

const SearchRecipe: React.FC = () => {
  const { data: recipesList } = useGetRecipesQuery(undefined);
  const [filtered, setFiltered] = useState<Recipe[] | undefined>();
  const navigate = useNavigate();

  const filterFromIngredients = (
    ingredients: Ingredient[],
    searchkey: string
  ): number => {
    const result = ingredients.filter(
      (item: Ingredient) => item.ingredient?.match(searchkey)?.length
    );
    return result.length;
  };

  const filterRecipes = (searchkey: string) => {
    if (recipesList && recipesList.length && searchkey.length) {
      const result = recipesList.filter(
        (item: Recipe) =>
          item.name.match(searchkey)?.length ||
          filterFromIngredients(item.ingredients || [], searchkey)
      );
      setFiltered(result);
    } else {
      setFiltered(undefined);
    }
  };

  return (
    <div className="search">
      <div className="recipe-search">
        <Form.Control
          type="text"
          placeholder="Enter recipe name or an ingredient"
          onChange={(e) => filterRecipes(e.target.value)}
          data-test-id="search-recipe"
        />
        {filtered?.length ? (
          <div className="search-result">
            <div>
              {filtered.map((item, index) => {
                return (
                  <div
                    key={item._id || index}
                    className="line"
                    onClick={() => navigate(item._id || "/")}
                  >
                    <p data-test-id={`search-result-${index}`} className="line-item">{item.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SearchRecipe;
