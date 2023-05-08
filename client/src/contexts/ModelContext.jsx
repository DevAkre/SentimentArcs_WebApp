import {useState, createContext} from 'react'

export const ModelContext = createContext(null);

export const ModelProvider = ({ children }) => {
  const [model, setModel] = useState(null);

  return <ModelContext.Provider value={{model,setModel}}>{children}</ModelContext.Provider>
}
