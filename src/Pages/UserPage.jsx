import { Link } from "react-router-dom"

export default function UserPage({ personalDetails, getTotalCalories }) {
  function getDate() {
    var newDate = new Date()
    var weekday = newDate.getDay()
    var options = { weekday: "long" }
    return new Intl.DateTimeFormat("en-UK", options).format(newDate)
  }

  if (!personalDetails) return <h1>Hold up...</h1>

  return (
    <div>
      <h1 className="hiUsername">
        Hi {personalDetails.username}
        <Link to="/" className="small">
          🖋  
        </Link>
      </h1>
      <h3 className="sub3">Let's check in!</h3>
      <div className="statsSection">
        <div className="statCell">
          <h4 className="statTitle">Weight</h4>
          <span className="statValue">{personalDetails.currentWeight}Kg</span>
        </div>
        <div className="statCell">
          <h4 className="statTitle">Goal Fast</h4>
          <span className="statValue">{personalDetails.goalFast}hr</span>
        </div>
        <div className="statCell">
          <h4 className="statTitle">Goal cal</h4>
          <span className="statValue">{personalDetails.goalCalories}</span>
        </div>
        <div className="statCell">
          <h4 className="statTitle">Goal Weight</h4>
          <span className="statValue">{personalDetails.goalWeight}Kg</span>
        </div>
        <div className="statCell">
          <h4 className="statTitle">Longest Fast</h4>
          <span className="statValue">21hr</span>
        </div>
        <div className="statCell">
          <h4 className="statTitle">Goals Won</h4>
          <span className="statValue">31</span>
        </div>
      </div>
      <div className="recordStats">
        <div className="title">
          <h4>Day</h4>
          <h4>Fast</h4>
          <h4>kcal</h4>
        </div>
        <div className="stats">
          <span>{getDate()}</span>
          <span>10:22</span>
          <span>{getTotalCalories()}</span>
        </div>
      </div>
    </div>
  )
}
