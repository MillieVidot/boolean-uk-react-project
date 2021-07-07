import { useEffect, useState } from "react"

export default function FoodPage() {
  const [input, setInput] = useState("")
  const [foods, setFoods] = useState([])
  const [eatenFood, setEatenFood] = useState([])
  const [calories, setCalories] = useState([])

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
        setEatenFood([...eatenFood, meal])
        setCalories([...calories, meal.kcal])
      })
  }

  function getArraySum(array) {
    let total = 0
    for (let i in array) {
      total += array[i]
    }
    return total
  }

  if (!foods) return <h1>Hold up...</h1>

  return (
    <div className="foodPage">
      <form>
        <input
          onChange={handleChangeSearch}
          type="text"
          name="foodType"
          value={input}
          placeholder="Start typing..."
        />
      </form>

      <select onChange={handleChangeSelect}>
        <option>Select</option>
        {foods.map(food => (
          <option key={food} value={food} className="circleBtn">
            {food}
          </option>
        ))}
      </select>

      <ul className="eatenList">
        {eatenFood.map(meal => (
          <li key={meal.id}>
            <span>{meal.name}</span>
            <input type="number" name="quanitity" value={meal.quantity} />
            <span>{meal.kcal}</span>
          </li>
        ))}
      </ul>
      <div>
        <span>Total:</span>
        <span>{getArraySum(calories)}</span>
      </div>
    </div>
  )
}
