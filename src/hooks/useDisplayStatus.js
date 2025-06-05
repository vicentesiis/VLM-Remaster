export function useDisplayStatus(status, data, isFetching) {
  if (isFetching) return "loading"
  if (status === "error") return "error"
  if (data === undefined) return "inactive"
  if (Array.isArray(data) && data.length === 0) return "empty"
  return "success"
}

export default useDisplayStatus
