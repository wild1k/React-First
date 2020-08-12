
import React from 'react'
import "./style.css"

function Button ({onHandleClick, title, disabledBy}) {
    return(
        <>
        <button onClick={onHandleClick} disabled={disabledBy} className="btn btn-primary mx-2 my-2">{title}</button>
        </>
    )
}

export default Button;