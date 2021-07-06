import { Link } from "react-router-dom"
export default function Nav(){
   return(
      <ol className="nav">
         <li>
            <Link to="/home">Home</Link>
         </li>
         <li>
            <Link to="/foodpage">Food</Link>
         </li>
         <li>
            <Link to="/userpage">Me</Link>
         </li>
      </ol>
   )
}