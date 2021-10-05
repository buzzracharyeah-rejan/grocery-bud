import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'
const getLocalStorage = () => {
  const list = localStorage.getItem('list');
  if(list) {
    return JSON.parse(list)
  } 
  return [];
}
function App() {
  const [list, setList] = useState(getLocalStorage());
  const [userInput, setUserInput] = useState(''); 
  const [isEditing, setIsEditing] = useState(false); 
  const [editId, setEditId] = useState(null); 
  const [alert, setAlert] = useState({show: false, msg: '', type: ''}); 

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list])

  const defaultAction = (msg, type) => {
    setUserInput(''); 
    setAlert({show: true, msg: msg, type: type})
  }
  
  const handleSubmit = e => {
    e.preventDefault(); 
    if(!userInput) { 
      setAlert({show: true, msg: 'Empty user input', type: 'danger'})
     
    }else if(userInput && isEditing) {
      setList(state => {
      const item = state.find(item => item.id === editId); 
      item.userInput = userInput; 
      // console.log(item)
      setIsEditing(false);
      defaultAction('item edited successfully', 'success');
      return [...state.filter(item => item.id !== editId), item]
      }); 
      

    } else {
      setList(state => {
        return [...state, {id: new Date().getTime().toString(), userInput}]
      });
      defaultAction('item added to the list', 'success')
      // setAlert({show: true, msg: 'item added to the list', type: 'success'});
    }
  }

  const updateAlert = () => {
    setAlert({show: false, msg: '', type: ''});
  }
  const clearAll = () => {
    setList([]); 
    defaultAction('stack empty', 'danger');
    // setAlert({show: true, msg: 'stack empty', type: 'danger'})
  }

  const removeItem = id => {
    setList(state => {
      return state.filter(item => item.id !== id);
    }); 
    defaultAction('item deleted successfully', 'danger');
  }

  const editItem = id => {
    const newItem = list.find(item => item.id === id); 
    setUserInput(newItem.userInput);
    setIsEditing(true); 
    setEditId(id);

  }
  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} updateAlert={updateAlert}/>}
        <h3>Grocery bud</h3>
        <div className="form-control">
          <input type="text" placeholder='eg. eggs' className='grocery'
          name='userInput' value={userInput} onChange={e => setUserInput(e.target.value)}/>
        <button type='submit' className='submit-btn'>
          {isEditing ? 'edit' : 'submit'}
        </button>
        </div>
      </form>
      <div className="grocery-container">
        <List list={list} removeItem={removeItem} editItem={editItem}/>
      </div>
        <button className="clear-btn" onClick={clearAll}>Clear all</button>
    </section>
   
  )
}

export default App
