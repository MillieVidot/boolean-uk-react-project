export default function HomePage(){

   // will need to be given fasting goal,
   // calorie goal, and calories consumed.
   return(
<div className="home">
<div className="clock">
   <p>Elapsed Time</p>
   <h1>      10:22   </h1>
   <p>05:38 Remaining</p>
</div>
<span>You are fasting!</span>
<div className="clock">
   <p>Calories Today</p>
   <h1>      2,245   </h1> 
   <p>255 Remaining</p>
</div>
</div>

   )
}

