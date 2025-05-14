export function useDisplayStatus(status, data) {
  if (data === undefined) return "inactive"
  if (status === "pending") return "loading"
  if (status === "error") return "error"
  if (Array.isArray(data) && data.length === 0) return "empty"
  return "success"
}

export default useDisplayStatus
