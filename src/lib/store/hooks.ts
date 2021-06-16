import React from "react"
import { AppDispatchContext, AppStateContext } from "./context"

export const useAppState = () => {
  const context = React.useContext(AppStateContext)
  if (context === undefined) {
    throw new Error('useCountState must be used within a CountProvider')
  }
  return context
}

export const useAppDispatch = () => {
  const context = React.useContext(AppDispatchContext)
  if (context === undefined) {
    throw new Error('useCountDispatch must be used within a CountProvider')
  }
  return context
}