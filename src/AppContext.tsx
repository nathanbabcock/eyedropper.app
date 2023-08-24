import { createContext, useContext, useState, type ReactNode } from 'react'

export type ContextType = {
  open: boolean
  setOpen: (open: boolean) => void
}

export const AppContext = createContext<ContextType>({
  open: false,
  setOpen: () => {
    throw new Error('Context not initialized')
  },
})

export function AppProvider({ children }: { children?: ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <AppContext.Provider value={{ open, setOpen }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context)
    throw new Error('useAppContext must be used within an AppProvider')
  return context
}
