// import './App.css';
import './style.css';
import { Route , Switch } from 'react-router-dom'
import WelcomePage from "./Pages/WelcomePage"
import HomePage from './Pages/HomePage';
import FoodPage from './Pages/FoodPage';
import UserPage from './Pages/UserPage';
import Nav from './Components/Nav';

function App() {
  return (
    <div className="App">
      <div className="screen">
    <Switch>
      <Route path="/welcome" exact>
        <WelcomePage/>
      </Route>
      <Route path="/home" exact>
        <HomePage/>
      </Route>
      <Route path="/foodpage" exact>
        <FoodPage/>
      </Route>
      <Route path="/userpage" exact>
        <UserPage/>
      </Route>


    </Switch>
    <Nav/>
    </div>
    </div>

  );
}

export default App;
