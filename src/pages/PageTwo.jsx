import React from 'react'
import {useNavigate} from "react-router-dom"
const PageTwo = () => {
    const navigate = useNavigate()
    const gotToPreviousPage = () =>
    {   
        navigate(-1)
    }
  return (
    <div>
      Page TWO
      <button onClick={gotToPreviousPage}>Go TO PRevious PAge</button>
    </div>
  )
}

export default PageTwo
