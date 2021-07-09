export default function PersonalDetailsForm({ handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="welcomeform">
      <label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          maxLength={12}
          required
        />
      </label>
      <label>
        Current Weight
        <input
          type="number"
          name="currentWeight"
          placeholder="Kg"
          min="40"
          step="0.5"
          required
        />
      </label>
      <label>
        Goal Weight
        <input
          type="number"
          name="goalWeight"
          placeholder="Kg"
          min="40"
          step="0.5"
          required
        />
      </label>
      <label>
        Goal Calories
        <input
          type="number"
          name="goalCalories"
          placeholder="Kg"
          min="800"
          step="50"
          required
        />
      </label>
      <label>
        Goal Fast
        <input
          type="number"
          name="goalFast"
          placeholder="hrs"
          min="8"
          step="0.5"
          required
        />
      </label>
      <input className="submitBtn" type="submit" />
    </form>
  )
}
