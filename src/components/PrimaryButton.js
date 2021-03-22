import React from 'react'
export default ({ children, className, otherClassName, id, onClick, disabled}) => {
  const handleClick = () => {
    if(onClick !== null || onClick !== undefined) {
      onClick()
    }
  }
  return (
    <div className ={`${className}`}>
      <button className={` ${otherClassName} hollow button primary`} id={id} type="button" onClick={() => handleClick()} disabled={disabled ? true : false}>
      {children}
    </button>
    </div>
   
  )
}
