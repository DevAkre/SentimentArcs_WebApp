import {useState, createContext} from 'react'

export const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const [text, setText] = useState(null);

  const store = {
    selected_text: {text, setText},
  };
  
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}
