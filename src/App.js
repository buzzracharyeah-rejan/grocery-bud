import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

function App() {
  const [list, setList] = useState([]);
  const [userInput, setUserInput] = useState(''); 
  const [onSubmit, setOnSubmit] = useState(false);
  const [onAlert, setOnAlert] = useState(false);
  const submitHandler = e => {
    e.preventDefault(); 
    // console.log('submit form')
    setOnSubmit(true);
    setList(prevList => {
      return [...prevList, 
        {id: new Date().getTime().toString(), 
        userInput}
      ]
    }); 
    setOnAlert(true);
    // console.log(list);
  }

  const updateAlert = () => {
    setOnAlert(false)
  }

  const clearAll = () => {
    setList([]);
    setOnAlert(true);
  }
  return (
    <section className="section-center">
       {onAlert && <Alert updateAlert={updateAlert}/>}
      <header>
        <div className="title">
          <h3>Grocery Bud</h3>
        </div>
      </header>
      <form className="grocery-form" onSubmit={submitHandler}>
        <div className="form-control">
          <input type="text" placeholder='e.g eggs' 
          name='userInput' value={userInput}
          onChange={e => setUserInput(e.target.value)}/>
          <button className="submit-btn">submit</button>
        </div>
      </form>
     
      {onSubmit && list.length > 0 &&
      <List list={list} />}
     <button className="clear-btn" onClick={clearAll}>
       clear all 
      </button>
    </section>
  )
}

export default App
