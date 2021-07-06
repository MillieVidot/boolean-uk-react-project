import { useState } from "react"

export default function FoodPage(){
   const [input, setInput] = useState("")
const [foods, setFoods] = useState([])
const [eatenFood, setEatenFood] = useState([])
  
function handleChange(event){
event.preventDefault()
const foodToSearchFor = event.target.value
fetch(`https://api.edamam.com/auto-complete?app_id=51b8589f&app_key=30a061fdbd1eb6d6b3a20123b7995e1f&q=${foodToSearchFor}`)
.then(resp=>resp.json())
.then(setFoods)
   }

   function addFood(foodItem){
      setEatenFood(foodItem)
      console.log(eatenFood)
// setEatenFood([...eatenFood, foodItem])
   }

   if (!foods) return <h1>Hold up...</h1>
   return(
<div className="foodPage">
<form >
   <input onChange={handleChange} type="text" name="foodType" value={input} placeholder="Start typing..."/>
</form>

<ul>
{foods.map(food=>
<li>{food}<button onClick={addFood(food)}className="circleBtn">+</button></li>
)}
</ul>

{/* <ul>
{eatenFood.map(food=>
<li>{food}</li>
)}
</ul> */}
</div>

   )
}