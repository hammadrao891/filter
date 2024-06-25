import React from 'react'
import {useNavigate} from "react-router-dom"
const Homepage = () => {
  const navigate = useNavigate()
  const handlePageOne = () => {
    navigate("/pageone")
  }
  const handlePageTwo = () =>{
    navigate("/pagetwo")
  }
    return (
    <div>
      <h1>HOMEPAGEEEEEEEEEEEEEEEEEEE</h1>
      <button onClick={handlePageOne}>Page One</button>
      <button onClick={handlePageTwo}>Page Twoo</button>
    </div>
  )
}

export default Homepage
