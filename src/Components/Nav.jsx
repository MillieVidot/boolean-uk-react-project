import { Link } from "react-router-dom"
export default function Nav() {
  return (
    <div className="nav">
      <Link to="/home">Home</Link>
      <Link to="/foodpage">Food</Link>
      <Link to="/userpage">Me</Link>
    </div>
  )
}
