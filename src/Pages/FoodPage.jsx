import { useEffect, useState } from "react"

export default function FoodPage({
  calories,
  setCalories,
  getTotalCalories,
  meals,
  setMeals,
}) {
  const [input, setInput] = useState("")
  const [foods, setFoods] = useState([])
  const [eatenFood, setEatenFood] = useState([])
  // const [meals, setMeals] = useState([])

  function handleChangeSearch(event) {
    setInput(event.target.value)
  }

  function handleChangeSelect(event) {
    addFood(event.target.value)
  }

  useEffect(() => {
    fetch(
      `https://api.edamam.com/auto-complete?app_id=51b8589f&app_key=30a061fdbd1eb6d6b3a20123b7995e1f&q=${input}`
    )
      .then(resp => resp.json())
      .then(setFoods)
  }, [input])

  function addFood(foodItem) {
    // this takes in food item from drop down
    fetch(
      `https://api.edamam.com/api/food-database/v2/parser?app_id=51b8589f&app_key=30a061fdbd1eb6d6b3a20123b7995e1f&ingr=${foodItem}&nutrition-type=logging`
    )
      .then(resp => resp.json())
      .then(resp => {
        const meal = {
          kcal: Number(resp.parsed[0].food.nutrients.ENERC_KCAL.toFixed(0)),
          name: foodItem,
          quantity: 1,
        }
        // setEatenFood([...eatenFood, meal])
        // setCalories([...calories, meal.kcal])
        addMealToServer(meal)
      })
  }

  function addMealToServer(meal) {
    fetch("http://localhost:4000/meals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(meal),
    })
      .then(resp => resp.json())
      .then(meal => {
        setMeals([...meals, meal])
      })
      .catch(error => {
        console.error("Error:", error)
      })
  }

  if (!foods) return <h1>Hold up...</h1>
  return (
    <div className="foodPage">
      <form>
        <input
          className="searchBar"
          onChange={handleChangeSearch}
          type="text"
          name="foodType"
          value={input}
          placeholder="Search..."
        />
      </form>

      <select className="dropDown" onChange={handleChangeSelect}>
        <option>Select</option>
        {foods.map(food => (
          <option key={food} value={food} className="circleBtn">
            {food}
          </option>
        ))}
      </select>

      <ul className="eatenList">
        {meals.map(meal => (
          <li key={meal.id}>
            <span>{meal.name}</span>
            <input type="number" name="quanitity" value={meal.quantity} />
            <span>{meal.kcal}</span>
          </li>
        ))}
      </ul>
      <h3>
        <span>Total: </span>
        <span>{getTotalCalories()}</span>
      </h3>
    </div>
  )
}
