import { useState } from "react"

export default function PersonalDetailsForm() {
  const [personalDetails, setPersonalDetails] = useState(null)

  function handleSubmit(event) {
    event.preventDefault()
    const data = {
      username: event.target.username.value,
      currentWeight: event.target.currentWeight.value,
      goalWeight: event.target.goalWeight.value,
      goalCalories: event.target.goalCalories.value,
      goalFast: event.target.goalFast.value,
    }

    console.log("personalDetails", personalDetails)
    console.log("data", data)
    addUser(data)
    event.target.reset()
  }

  function addUser(user) {
    fetch("http://localhost:4000/users", {
      method: "POST",
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

  return (
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
      <input className="submitBtn" type="submit" />
    </form>
  )
}
