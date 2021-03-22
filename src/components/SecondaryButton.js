import React from 'react'
export default ({ children, className, id, onClick, disabled}) => {
  const handleClick = () => {
    if(onClick !== null || onClick !== undefined) {
      onClick()
    }
  }
  return (
    <button className={`${className} hollow button secondary`} id={id} type="button" onClick={() => handleClick()} disabled={disabled ? true : false}>
      {children}
    </button>
  )
}
