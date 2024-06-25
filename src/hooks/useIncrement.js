
import React, { useState } from 'react'

const useIncrement = (initalValue,step) => {
 const [value,setValue] = useState(initalValue)
const increment = () =>{
 setValue(prev => prev + step)
}   
 return [value,increment] 
    
}

export default useIncrement
