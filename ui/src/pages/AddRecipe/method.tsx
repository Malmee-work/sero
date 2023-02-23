import { Button, Form, InputGroup } from "react-bootstrap";

interface Props {
  index: number;
  item: string;
  updateMethod: Function;
  removeMethod: Function;
}
const Method: React.FC<Props> = ({
  index,
  item,
  updateMethod,
  removeMethod,
}) => {
  return (
    <InputGroup className="mb-3">
      <InputGroup.Text id="basic-addon1">{index + 1}</InputGroup.Text>
      <Form.Control
        type="text"
        placeholder="method"
        value={item}
        onChange={(e) => updateMethod(index, e.target.value)}
        data-test-id={`add-method-${index}`}
      />
      <Button
        variant="outline-secondary"
        id="button-addon1"
        onClick={() => removeMethod(index)}
      >
        X
      </Button>
    </InputGroup>
  );
};

export default Method;
