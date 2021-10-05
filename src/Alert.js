import React, { useEffect } from 'react'

const Alert = ({type, msg, updateAlert}) => {
  useEffect(() => {
    setTimeout(()=>{
      updateAlert();
    }, 3000);

  })
  return <div className="alert">
    <h4 className={`alert-${type}`}>{msg}</h4>
  </div>
}

export default Alert
