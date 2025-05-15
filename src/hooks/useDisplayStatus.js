export function useDisplayStatus(status, data, isFetching) {
  if (Array.isArray(data) && data.length === 0) return "empty"
  if (isFetching) return "loading"
  if (status === "error") return "error"
  if (data === undefined) return "inactive"
  return "success"
}

export default useDisplayStatus
