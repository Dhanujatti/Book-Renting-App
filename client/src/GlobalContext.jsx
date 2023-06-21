import React, { createContext } from 'react'
import useAuthAPI from './API/AuthAPI'

export const GlobalContext = createContext()
function DataProvider(props) {
    let data = {
        auth:useAuthAPI()
    }
  return (
 <GlobalContext.Provider value={data}>
    {
        props.children
    }
 </GlobalContext.Provider>
    )
}
export default DataProvider
