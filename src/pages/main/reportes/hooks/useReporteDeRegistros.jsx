// import { useState } from "react"
// import { endOfMonth, format } from "date-fns"
// import { es } from "date-fns/locale"
// import { toast } from "sonner"
// import { useCurrentUser } from "@/hooks/useCurrentUser"
// import { useGroupAndMembersFilter } from "@/hooks/useGroupAndMemebersFilter"
// import { useGetAgentRegistrations } from "@/hooks/queries/UseReports"
// import {
//   groupConfig,
//   monthConfig,
//   record_type,
//   userConfig,
//   yearConfig,
// } from "@/components/customs/filter/filter-config"

// export const useReporteDeRegistros = () => {
//   const [searchParams, setSearchParams] = useState(null)
//   const { isAdmin, group } = useCurrentUser()

//   const { values, onChange, listOfGroups, listOfUsers } =
//     useGroupAndMembersFilter({
//       group_id: isAdmin ? group?.id || "" : "",
//       user_id: "",
//       month: "",
//       year: "",
//       record_type: "",
//     })

//   const handleSearch = () => {
//     const { user_id, month, year, record_type } = values
//     if (!user_id || !month || !year) {
//       toast.error("Por favor llene los campos obligatorios.")
//       return
//     }

//     const start_date = `${year}-${month}-01T00:00:00`
//     const end_date = format(endOfMonth(new Date(start_date)), "yyyy-MM-dd'T'23:59:59")

//     setSearchParams({ user_id, start_date, end_date, record_type })
//   }

//   const { data, isLoading } = useGetAgentRegistrations(searchParams ?? {}, {
//     enabled: !!searchParams,
//   })

//   const chartData = Array.isArray(data?.daily_registrations)
//     ? data.daily_registrations.map((registro) => ({
//         title: format(new Date(registro.date), "d", { locale: es }),
//         description: registro.amount_of_registrations ?? 0,
//       }))
//     : []

//   const filterConfig = [
//     ...(listOfGroups.length ? [groupConfig] : []),
//     userConfig,
//     monthConfig,
//     yearConfig,
//     record_type,
//   ]

//   return {
//     values,
//     onChange,
//     listOfGroups,
//     listOfUsers,
//     handleSearch,
//     data,
//     isLoading,
//     chartData,
//     filterConfig,
//   }
// }