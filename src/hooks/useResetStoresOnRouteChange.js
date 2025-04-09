import { useEffect } from "react"
import { useLocation } from "react-router-dom" // React Router v6 hooks
import {
  useCheckboxStore,
  useDateRangeStore,
  useSearchStore,
} from "@/store/filterInputsStore"

export const useResetStoresOnRouteChange = () => {
  const location = useLocation() // Get current location object from React Router

  // Reset the stores when the route changes
  useEffect(() => {
    // Reset the stores whenever the route changes
    useSearchStore.getState().setSearchQuery("")
    useDateRangeStore.getState().setDateRange({ from: null, to: null })
    useCheckboxStore.getState().setSelectedValues([])
  }, [location]) // Depend on location to detect route changes
}

export default useResetStoresOnRouteChange
