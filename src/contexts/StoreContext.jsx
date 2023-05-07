import {useState, createContext} from 'react'

export const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const [text, setText] = useState(null);
  const [cleanText, setCleanText] = useState(null);

  const store = {
    selected_text: {text, setText},
    selected_clean_text: {cleanText, setCleanText}
  };
  
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}
