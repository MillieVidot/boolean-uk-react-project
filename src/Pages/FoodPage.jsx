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

  function deleteMeal(mealToDelete) {
    fetch(`http://localhost:4000/meals/${mealToDelete.id}`, {
      method: "DELETE",
    }).then(() => {
      setMeals(meals.filter(meal => meal.id !== mealToDelete.id))
    })
  }

  function upQuantity(mealToIncrease) {
    fetch(`http://localhost:4000/meals/${mealToIncrease.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: mealToIncrease.quantity + 1 }),
    })
      .then(resp => resp.json())
      .then(mealReturnFromServer => {
        setMeals(
          meals.map(target => {
            if (target.id === mealReturnFromServer.id)
              return mealReturnFromServer
            return target
          })
        )
      })
    // START HERE <<<<<<<
  }

  if (!foods) return <h1>Hold up...</h1>
  return (
    <div className="foodPage">
      <h3 className="sub3">Add Meals</h3>
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
        <li className="statTitle">
          <span>Del</span>
          <span>Meal</span>
          <span>Qty</span>
          <span>kcal</span>
        </li>
        {meals.map(meal => (
          <li key={meal.id}>
            <button
              onClick={() => {
                deleteMeal(meal)
              }}
              className="deleteBtn"
            >
              ✖️
            </button>
            <span>{meal.name}</span>
            <input
              onChange={() => {
                upQuantity(meal)
              }}
              className="mealQuantity"
              type="number"
              name="quanitity"
              value={meal.quantity}
            />
            <span>{meal.kcal}</span>
          </li>
        ))}
      </ul>
      <div className="">
        <h3>
          <span>Total: </span>
          <span>{getTotalCalories()}</span>
        </h3>
        <button
          onClick={() => console.log("Let's start fasting!")}
          className="startFastBtn"
        >
          Submit total
        </button>
      </div>
    </div>
  )
}
