import { Button, Form, InputGroup } from "react-bootstrap";
import { Ingredient } from "../../types/ingredient";

interface Props {
  index: number;
  item: Ingredient;
  updateIngredient: Function;
  removeIngredient: Function;
}
const IngredientItem: React.FC<Props> = ({
  index,
  item,
  updateIngredient,
  removeIngredient,
}) => {
  return (
    <InputGroup className="mb-3">
      <Form.Control
        type="text"
        className="add-ingredient"
        placeholder="ingredient"
        value={item.ingredient || ""}
        onChange={(e) =>
          updateIngredient(index, { ...item, ingredient: e.target.value })
        }
        data-test-id={`add-ingredient-name-${index}`}
      />
      <Form.Control
        className="add-amount"
        type="number"
        placeholder="amount"
        value={item.amount || ""}
        onChange={(e) =>
          updateIngredient(index, { ...item, amount: +e.target.value })
        }
        data-test-id={`add-ingredient-amount-${index}`}
      />
      <Form.Select
        placeholder="measurement"
        value={item.measurement || ""}
        onChange={(e) =>
          updateIngredient(index, { ...item, measurement: e.target.value })
        }
        data-test-id={`add-ingredient-measurement-${index}`}
      >
        <option value="spoons">spoons</option>
        <option value="cups">cups</option>
        <option value="millilitres">millilitres</option>
        <option value="units">units</option>
      </Form.Select>
      <Button
        variant="outline-secondary"
        id="button-addon1"
        onClick={() => removeIngredient(index)}
      >
        X
      </Button>
    </InputGroup>
  );
};

export default IngredientItem;
