import { useState, useEffect} from 'react';

function PizzaForm({selectedPizza, handlePizzaEdit}) {

const [ formData, setFormData] = useState({
  topping: '',
  size: '',
  vegetarian: ''
})

useEffect(() => {
  setFormData({
    topping: selectedPizza.topping,
    size: selectedPizza.size,
    vegetarian: selectedPizza.vegetarian
  })
},[selectedPizza])

const onFormUpdate = (e) => {
  const { name, value } = e.target;

  const newValue = name === "vegetarian"
    ? value === "true" 
    : value;

  setFormData(prev => ({
    ...prev,
    [name]: newValue
  }));
};


const onSubmit = (e) => {
  e.preventDefault()
  const updatedPizza = ({
    id: selectedPizza.id,
    ...formData
  })
  handlePizzaEdit(updatedPizza)
  clearForm()
}

const clearForm = () => {
  setFormData({
    topping: '',
    size: '',
    vegetarian: ''
  })
}

  return (
    <form onSubmit={onSubmit}>
      <div className="form-row">
        <div className="col-5">
          <input
            className="form-control"
            type="text"
            value={formData.topping}
            name="topping"
            onChange={onFormUpdate}
            placeholder="Pizza Topping"
          />
        </div>
        <div className="col">
          <select className="form-control" name="size" value={formData.size} onChange={onFormUpdate}> 
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check" >
            <input
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value={true}
              checked={formData.vegetarian === true}
              onChange={onFormUpdate}
            />
            <label className="form-check-label">Vegetarian</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value={false}
              checked={formData.vegetarian === false}
              onChange={onFormUpdate}
            />
            <label className="form-check-label">Not Vegetarian</label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default PizzaForm;
