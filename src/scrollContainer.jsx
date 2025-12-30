import { createContext, useContext } from 'react'

const ScrollContainerContext = createContext(null)

export function ScrollContainerProvider({ value, children }) {
  return <ScrollContainerContext.Provider value={value}>{children}</ScrollContainerContext.Provider>
}

export function useScrollContainer() {
  return useContext(ScrollContainerContext)
}

