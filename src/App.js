import "./style.css"
import { useHistory, Route, Switch } from "react-router-dom"
import WelcomePage from "./Pages/WelcomePage"
import HomePage from "./Pages/HomePage"
import FoodPage from "./Pages/FoodPage"
import UserPage from "./Pages/UserPage"
import Nav from "./Components/Nav"
import { useEffect, useState } from "react"

function App() {
  const [personalDetails, setPersonalDetails] = useState({})
  const [calories, setCalories] = useState([])
  const [meals, setMeals] = useState([])
  const history = useHistory()

  function handleSubmit(event) {
    event.preventDefault()
    const data = {
      username: event.target.username.value,
      currentWeight: event.target.currentWeight.value,
      goalWeight: event.target.goalWeight.value,
      goalCalories: event.target.goalCalories.value,
      goalFast: event.target.goalFast.value,
    }
    addUser(data)
    console.log(data)
    history.push("/home")
    // event.target.reset()
  }

  function addUser(user) {
    fetch("http://localhost:4000/users/1", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then(resp => resp.json())
      .then(personalDetails => {
        setPersonalDetails(personalDetails)
      })
      .catch(error => {
        console.error("Error:", error)
      })
  }

  function getTotalCalories() {
    let total = 0
    for (let i in meals) {
      total += meals[i].kcal * meals[i].quantity
    }
    return total
  }

  function getTotalCaloriesRemaining() {
    let total = getTotalCalories()
    let totalRemaining = personalDetails.goalCalories - total
    return totalRemaining
  }

  useEffect(() => {
    fetch("http://localhost:4000/users")
      .then(resp => resp.json())
      .then(resp => setPersonalDetails(resp[0]))
  }, [])

  useEffect(() => {
    fetch("http://localhost:4000/meals")
      .then(resp => resp.json())
      .then(setMeals)
  }, [])

  return (
    <div className="App">
      <div className="phone">
        <div className="screen">
          <Switch>
            <Route path="/" exact>
              <WelcomePage handleSubmit={handleSubmit} />
            </Route>
            <Route path="/home" exact>
              <HomePage
                getTotalCalories={getTotalCalories}
                getTotalCaloriesRemaining={getTotalCaloriesRemaining}
              />
              <Nav />
            </Route>
            <Route path="/foodpage" exact>
              <FoodPage
                calories={calories}
                setCalories={setCalories}
                getTotalCalories={getTotalCalories}
                meals={meals}
                setMeals={setMeals}
              />
              <Nav />
            </Route>
            <Route path="/userpage" exact>
              <UserPage
                personalDetails={personalDetails}
                getTotalCalories={getTotalCalories}
              />
              <Nav />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default App
