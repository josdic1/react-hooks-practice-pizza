import { useState, useEffect} from 'react';
import Header from "./Header";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";

function App() {

const [ pizzas, setPizzas ] = useState([])
const [selectedPizza, setSelectedPizza] = useState({
  id: '',
  topping: '',
  size: '',
  vegetarian: ''
})

useEffect(() => {
  renderPizzas()
},[])

const handleFormUpdate = (obj) => {
  setSelectedPizza(obj)
}

async function renderPizzas() {
  try {
    const r = await fetch (`http://localhost:3001/pizzas`)
    if(!r.ok) {
      throw new Error("💥 Error");
    }
    const data = await r.json()
    setPizzas(data)
  }catch (error) {console.error("❌ Caught error:", error);}
}

async function handlePizzaEdit(obj) {
  try {
    const r = await fetch(`http://localhost:3001/pizzas/${obj.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(obj)
    })
    if(!r.ok) {
      throw new Error("💥 Error");
    }
    const data = await r.json()
    const updatedList = pizzas.map(p => (
      p.id === data.id ? data : p
    ))
    setPizzas(updatedList)
  }catch (error) {console.error("❌ Caught error:", error);}
}

  return (
    <>
      <Header />
      <PizzaForm 
      selectedPizza={selectedPizza}
      handlePizzaEdit={handlePizzaEdit}
      />
      <PizzaList 
      pizzas={pizzas}
      onFormUpdate={handleFormUpdate}
     
      />
    </>
  );
}

export default App;
