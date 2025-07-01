import { useRef, useState } from "react"
import { toast } from "sonner"
import { useGetRecordById } from "@/hooks/queries"
import { useGetOrderById } from "@/hooks/queries/useOrder"
import { useGetVacantbyId } from "@/hooks/queries/useVacants"

async function handleSearchByType({ type, query, refetchers }) {
  if (!query) {
    toast.error("Ingresa un ID válido para buscar.")
    return null
  }

  try {
    switch (type) {
      case "Registros": {
        const res = await refetchers.refetchRecord()
        if (res.error || !res.data) throw res.error
        return { redirectPath: `/registros/detalle/${res.data.public_id}` }
      }

      case "Vacantes": {
        const res = await refetchers.refetchVacant()
        if (res.error || !res.data) throw res.error
        return { redirectPath: `/vacantes/detalle/${res.data.id}` }
      }

      case "Ordenes": {
        const res = await refetchers.refetchOrder()
        if (res.error || !res.data) throw res.error
        return { showModal: true, data: res.data }
      }

      default:
        toast.error("Tipo de búsqueda no soportado.")
        return null
    }
  } catch (error) {
    const message =
      error?.response?.data?.detail || "Ocurrió un error en la búsqueda."
    toast.error(message)
    return null
  }
}

export function useSearchById(defaultOption = "Registros") {
  const [selectedOption, setSelectedOption] = useState(defaultOption)
  const [searchQuery, setSearchQuery] = useState("")
  const [result, setResult] = useState(null)
  const inputRef = useRef(null)

  const {
    data: recordData,
    refetch: refetchRecord,
    isFetching: isFetchingRecord,
  } = useGetRecordById(searchQuery, { enabled: false })

  const {
    data: vacantData,
    refetch: refetchVacant,
    isFetching: isFetchingVacant,
  } = useGetVacantbyId(searchQuery, { enabled: false })

  const {
    data: orderData,
    refetch: refetchOrder,
    isFetching: isFetchingOrder,
  } = useGetOrderById({ order_id: searchQuery }, { enabled: false })

  const handleSearchClick = async () => {
    const response = await handleSearchByType({
      type: selectedOption,
      query: searchQuery,
      refetchers: {
        refetchRecord,
        refetchVacant,
        refetchOrder,
      },
    })

    setResult(response)
  }

  return {
    selectedOption,
    setSelectedOption,
    searchQuery,
    setSearchQuery,
    inputRef,
    handleSearchClick,
    result,
    data: { recordData, vacantData, orderData },
    isLoading: isFetchingRecord || isFetchingVacant || isFetchingOrder,
  }
}
