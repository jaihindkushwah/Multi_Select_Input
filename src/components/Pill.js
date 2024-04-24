import React from 'react'

function Pill({image,text,onClick}) {
  return (
    <span className='user-pill'>
        <img src={image} alt={text} />
        <span>{text}</span>
        <span onClick={onClick} className='delete-pill' >&times;</span>
    </span>
  )
}

export default Pill