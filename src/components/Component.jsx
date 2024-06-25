import React from 'react'
import { useSelector } from 'react-redux'

const Component = () => {
    const count = useSelector((state) => state.counter.value)
  
    return (
    <div>
      {count}
    </div>
  )
}

export default Component
