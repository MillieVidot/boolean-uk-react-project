import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function FoodPage({
  getTotalCalories,
  meals,
  setMeals,
  getDate,
}) {
  const [input, setInput] = useState("")
  const [foods, setFoods] = useState([])
  const [logs, setLogs] = useState([])

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

  function handleChangeQty(id, event) {
    changeQty(id, Number(event.target.value))
  }

  function changeQty(id, value) {
    fetch(`http://localhost:4000/meals/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: value }),
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
  }

  function handleSubmitTotal() {
    console.log("Let's start fasting!")
    logData()
  }

  function logData() {
    const calories = getTotalCalories()
    const day = getDate()
    const log = {
      day: day,
      fast: "19:31",
      kcal: calories,
    }
    fetch("http://localhost:4000/logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(log),
    })
      .then(resp => resp.json())
      .then(log => {
        setLogs([...logs, log])
      })
      .catch(error => {
        console.error("Error:", error)
      })

    console.log("data is logged", log)
    wipeTodaysMeals()
  }

  function wipeTodaysMeals() {
    for (const meal of meals) {
      fetch(`http://localhost:4000/meals/${meal.id}`, {
        method: "DELETE",
      })
        .then(setMeals([]))
        .then(console.log)
    }
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
              onChange={event => {
                handleChangeQty(meal.id, event)
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
      <div className="bottomSection">
        <h3>
          <span>Total: </span>
          <span>{getTotalCalories()}</span>
        </h3>
        <Link
          to="/userpage"
          onClick={handleSubmitTotal}
          className="startFastBtn"
        >
          Submit Today's Meals
        </Link>
      </div>
    </div>
  )
}
