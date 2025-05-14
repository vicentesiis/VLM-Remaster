import { useQuery } from "@tanstack/react-query"

export const useFilterQuery = ({ queryKey, queryFn, enabled = false }) => {
  const query = useQuery({
    queryKey,
    queryFn,
    enabled,
  })

  return query
}

export default useFilterQuery