import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

export default function UserPage({ personalDetails }) {
  const [logs, setLogs] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/logs")
      .then(resp => resp.json())
      .then(setLogs)
  }, [])

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
          <span className="statValue">{logs.length}</span>
        </div>
      </div>
      <div className="recordStats">
        <div className="title">
          <h4>Day</h4>
          <h4>Fast</h4>
          <h4>kcal</h4>
        </div>
        <ul>
          {logs.map(log => (
            <li key={log.id} className="stats">
              <span>{log.day}</span>
              <span>{log.fast}</span>
              <span>{log.kcal}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
