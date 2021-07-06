import { useState } from "react"
import { Link } from "react-router-dom"

export default function PersonalDetailsForm(){

const [personalDetails, setPersonalDetails] = useState(null)

function handleSubmit(event){
event.preventDefault()
const data = {
   username: event.target.username.value,
   currentWeight: event.target.currentWeight.value,
   goalWeight: event.target.goalWeight.value,
   goalCalories: event.target.goalCalories.value,
   goalFast: event.target.goalFast.value,
}
setPersonalDetails(data)
event.target.reset()
}

   return(
      <form onSubmit={handleSubmit} className="welcomeform">
      <label>
        <input type="text" name="username" placeholder="Username" required />
      </label>
      <label>
        Current Weight
        <input type="number" name="currentWeight" placeholder="Kg" required />
      </label>
      <label>
        Goal Weight
        <input type="number" name="goalWeight" placeholder="Kg" required />
      </label>
      <label>
        Goal Calories
        <input type="number" name="goalCalories" placeholder="Kg" required />
      </label>
      <label>
        Goal Fast
        <input type="number" name="goalFast" placeholder="hrs" required />
      </label>
      <Link to="/home">
      <input className="submitBtn" type="submit"/>
      </Link>
    </form>
   )
}