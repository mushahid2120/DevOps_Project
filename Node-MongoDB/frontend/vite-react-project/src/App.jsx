import React,{ useState } from 'react'
import axios from 'axios'
import './App.css'

import Demo from "./my.jsx"

function App() {
  const [data, setData] = useState('')

const handleSubmit= async (e)=>{
e.preventDefault();
 try{
   const response= await axios.post('http://mynode:4000/submit',{data});
    // alert(response.data.message);
    setData('');
   } catch(error){
     console.log(error);
//     alert(error);
}
 }

  return (
    <div className="container">
      <h1 className="heading">Enter what you want to save in MongoDB Database</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            className="texting"
            value={data}
            onChange={(e) => setData(e.target.value)}
            placeholder="Enter data here"
          />
      </div>
        <div>
          <button type="submit" className="button">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
  // return (<h1>Hello World!!!!!!</h1>)
}

export default App
