import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useAddRecipeMutation } from "../../store/api-slice";
import { Ingredient } from "../../types/ingredient";
import "./index.scss";
import IngredientItem from "./ingredient";
import Method from "./method";

const AddRecipe: React.FC = () => {
  const [name, setName] = useState<string | undefined>();
  const [ingredients, setIngredients] = useState<Ingredient[]>([{}]);
  const [methods, setMethods] = useState<string[]>([""]);
  const [alert, setAlert] = useState<
    { message: string; type: string } | undefined
  >(undefined);
  const navigate = useNavigate();
  const [addRecipe] = useAddRecipeMutation();

  const addIngredient = () => {
    setIngredients((ingredients) => [...ingredients, {}]);
  };

  const removeIngredient = (index: number) => {
    const array = [...ingredients];
    array.splice(index, 1);
    setIngredients(array);
  };

  const updateIngredient = (index: number, item: Ingredient) => {
    const array = [...ingredients];
    array[index] = item;
    setIngredients(array);
  };

  const addMethod = () => {
    setMethods((methods) => [...methods, ""]);
  };

  const removeMethod = (index: number) => {
    const array = [...methods];
    array.splice(index, 1);
    setMethods(array);
  };

  const updateMethod = (index: number, item: string) => {
    const array = [...methods];
    array[index] = item;
    setMethods(array);
  };

  const resetState = () => {
    setName(undefined);
    setIngredients([{}]);
    setMethods([""]);
  };

  const verifyInputs = (emptyIngredients: number, emptyMethods: number) => {
    if (emptyIngredients && emptyMethods) {
      setAlert({
        message: "Ingredients and methods can't have empty values",
        type: "warning",
      });
    } else if (emptyIngredients) {
      setAlert({
        message: "Ingredients can't have empty values",
        type: "warning",
      });
    } else if (emptyMethods) {
      setAlert({ message: "Methods can't have empty values", type: "warning" });
    } else {
      setAlert(undefined);
    }
  };

  const onAddRecipe = async (): Promise<void> => {
    const emptyIngredients = ingredients.filter((item) => !item.ingredient);
    const emptyMethods = methods.filter((item) => !item.length);
    verifyInputs(emptyIngredients.length, emptyMethods.length);
    if (!emptyIngredients.length && !emptyMethods.length) {
      try {
        await addRecipe({
          name,
          ingredients,
          methods,
        });
        resetState();
        setAlert({ message: "Recipe added successfully", type: "success" });
      } catch (err) {
        setAlert({
          message: "Error occured while adding the recipe",
          type: "danger",
        });
      }
    }
  };

  return (
    <div>
      {alert ? (
        <Alert
          variant={alert.type}
          onClose={() => setAlert(undefined)}
          dismissible
          data-test-id="add-recipe-alert"
        >
          {alert.message}
        </Alert>
      ) : null}
      <Button
        variant="secondary"
        className="back-button"
        onClick={() => navigate("/")}
        data-test-id="back-from-add-recipe"
      >
        Back
      </Button>
      <div className="add">
        <p>Add a new recipe</p>
        <Form className="add-form">
          <Form.Group className="mb-5">
            <Form.Label>Name *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter recipe name"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
              data-test-id="new-recipe-name"
            />
          </Form.Group>
          <Form.Group className="mb-5">
            <Form.Label>Ingredients</Form.Label>
            <Button
              className="add-item"
              variant="outline-dark"
              size="sm"
              onClick={addIngredient}
              data-test-id="add-ingredient"
            >
              Add ingredient
            </Button>
            {ingredients.map((item, index) => {
              return (
                <IngredientItem
                  key={`ingredient${index}`}
                  index={index}
                  item={item}
                  updateIngredient={updateIngredient}
                  removeIngredient={removeIngredient}
                />
              );
            })}
          </Form.Group>
          <Form.Group className="mb-5">
            <Form.Label>Cooking methods</Form.Label>
            <Button
              className="add-item"
              variant="outline-dark"
              size="sm"
              onClick={addMethod}
              data-test-id="add-method"
            >
              Add method
            </Button>
            {methods.map((item, index) => {
              return (
                <Method
                  key={`method${index}`}
                  index={index}
                  item={item}
                  updateMethod={updateMethod}
                  removeMethod={removeMethod}
                />
              );
            })}
          </Form.Group>
          <Button variant="secondary" disabled={!name} onClick={onAddRecipe} data-test-id="add-recipe">
            Add recipe
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddRecipe;
