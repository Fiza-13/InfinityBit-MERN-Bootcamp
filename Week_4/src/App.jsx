import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {


  let [counter, setCounter]= useState(0)

   
  const addValue = () => {
    counter = (counter + 1);
    setCounter(counter);
  };

  const removeValue = () => {
    setCounter(counter - 1);
  };
  
  const resetCounter = () => {
    setCounter(0);
  };

  return (
    <div className = "container">

      <h1>React Counter App....</h1>
      <div className = "counterValue"> {counter}
      </div>

      <div className = "buttonContainer"> 
      <button className='button'
      onClick = {addValue}
      > Add By 1 </button>

      <br/>

      <button className = "button"
      onClick = {removeValue}>
         Substract by 1 
      </button>

      <br/>
      
      <button className="button reset-button" onClick={resetCounter}>
          Reset
        </button>
      </div>

    </div>
  
);
}

export default App
