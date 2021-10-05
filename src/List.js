import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
const List = ({list}) => {
 return (
   <article className='grocery-container'>
     {list.map(todos => {
       const {id, userInput} = todos; 
       return (
        <div key={id}className="grocery-item">
        <p>{userInput}</p>
        <div className="container">
            <FaEdit className='edit-btn'/>
            <FaTrash className='delete-btn'/>
        </div>
        </div>
       );
     })}
   </article>
 )
}

export default List
