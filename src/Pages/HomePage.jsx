import { Link } from "react-router-dom"

export default function HomePage({
  getTotalCalories,
  getTotalCaloriesRemaining,
}) {
  // will need to be given fasting goal,
  // calorie goal, and calories consumed.
  return (
    <div className="home">
      <div className="clock">
        <p>Elapsed Time</p>
        <h1> 10:22 </h1>
        <p>05:38 Remaining</p>
      </div>
      <span>You are fasting!</span>
      <Link to="/foodpage" className="clock">
        <p>Calories Today</p>
        <h1>{getTotalCalories()}</h1>
        <p>{getTotalCaloriesRemaining()} Remaining</p>
      </Link>
    </div>
  )
}
{
  /* <div className="clock">
<p>Calories Today</p>
<h1>{getTotalCalories()}</h1>
<p>{getTotalCaloriesRemaining()} Remaining</p>
</div> */
}
