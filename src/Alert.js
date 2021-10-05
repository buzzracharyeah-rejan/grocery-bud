import React, { useEffect } from 'react'

const Alert = ({updateAlert}) => {
  useEffect(() => {
    setTimeout(()=>{
      updateAlert();
    }, 3000);

  })
  return <div className="alert">
    <h4 className="alert-success">item added to the list</h4>
  </div>
}

export default Alert
