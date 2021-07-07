export default function UserPage() {
  return (
    <div>
      <h1>Hi UserName</h1>
      <div className="statsSection">
        <div className="statCell">
          <h4 className="statTitle">Weight</h4>
          <span className="statValue">60kg</span>
        </div>
        <div className="statCell">
          <h4 className="statTitle">Goal Fast</h4>
          <span className="statValue">18hr</span>
        </div>
        <div className="statCell">
          <h4 className="statTitle">Goal cal</h4>
          <span className="statValue">2500</span>
        </div>
        <div className="statCell">
          <h4 className="statTitle">Goal Weight</h4>
          <span className="statValue">55kg</span>
        </div>
        <div className="statCell">
          <h4 className="statTitle">Longest Fast</h4>
          <span className="statValue">21hr</span>
        </div>
        <div className="statCell">
          <h4 className="statTitle">Goals Reached</h4>
          <span className="statValue">31</span>
        </div>
      </div>
      <div className="recordStats">
        <div>
          {" "}
          <h4>Day</h4>
          <h4>Fast</h4>
          <h4>kcal</h4>
        </div>
        <div>
          <span>Day</span>
          <span>10:22</span>
          <span>2245</span>
        </div>
      </div>
    </div>
  )
}
