import { useContext } from "react"
import { NotificationContext } from "../Contexts/NotificationProvider"

export const useNotification = () => {
  return useContext(NotificationContext)
}
