import React from "react";
import Pizza from "./Pizza";

function PizzaList({pizzas, onFormUpdate}) {

  const onEditClick = (pizza) => {
    const pizzaToEdit = {
      ...pizza
    }
    onFormUpdate(pizzaToEdit)
  }

  const pizzaData = pizzas.map(p => (
    <Pizza key={p.id} pizza={p} onClick={onEditClick}/>
  ))

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Topping</th>
          <th scope="col">Size</th>
          <th scope="col">Vegetarian?</th>
          <th scope="col">Edit</th>
        </tr>
      </thead>
      <tbody>
        {
          pizzaData
        }
      </tbody>
    </table>
  );
}

export default PizzaList;
