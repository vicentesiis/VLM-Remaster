import { Repeat } from "lucide-react"
import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { toast } from "sonner"
import LabeledSelect from "@/components/customs/filter/labeled-select"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"

import { Button } from "@/components/ui/button"
import {
  useGetGroupById,
  useGetGroups,
  useReassignRecord,
} from "@/hooks/queries"
import { useCurrentUser } from "@/hooks/useCurrentUser"

export const ReassingRecordDialog = ({ record }) => {
  const [selectedUserId, setSelectedUserId] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { group, isSuperAdmin } = useCurrentUser()

  const { data: groupsResponse } = useGetGroups({ enabled: isSuperAdmin })
  const allGroups = groupsResponse?.data ?? []

  const { mutateAsync: reassignRecord } = useReassignRecord(record?.public_id, {
    onError: (error) => {
      console.error("Error reassigning record:", error)
      toast.error("Error al reasignar el registro")
    },
  })

  let targetGroupId = null

  if (isSuperAdmin && record?.user?.id) {
    const recordOwnerGroup = allGroups.find((group) => {
      const isLeader = group.leader?.id === record.user.id
      const isMember = group.members?.some(
        (member) => member.id === record.user.id
      )
      return isLeader || isMember
    })
    targetGroupId = recordOwnerGroup?.id
  } else {
    targetGroupId = group?.id
  }

  const { data: response } = useGetGroupById({
    group_searchable_id: targetGroupId,
    with_members: true,
  })

  const groupData = response?.data
  const members = groupData?.members ?? []
  const leader = groupData?.leader

  const allUsers = leader
    ? [leader, ...members.filter((m) => m.id !== leader.id)]
    : members

  const userOptions = allUsers.map((user) => ({
    label: user.name,
    value: user.id,
  }))

  useEffect(() => {
    if (isDialogOpen) {
      setSelectedUserId("")
    }
  }, [isDialogOpen])

  const handleReassign = async () => {
    if (!selectedUserId) {
      toast.error("Por favor selecciona un agente")
      return
    }

    if (selectedUserId === record?.user?.id) {
      toast.error("El registro ya está asignado a este agente")
      return
    }

    console.log("Starting reassign with:", {
      record_id: record?.id,
      user_id: selectedUserId,
    })

    setIsSubmitting(true)
    try {
      const result = await reassignRecord({
        record_id: record?.id,
        user_id: selectedUserId,
      })
      console.log("Reassign result:", result)
      toast.success("Registro reasignado exitosamente")
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Reassign error in handleReassign:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="edit" size="sm">
          <Repeat />
          Reasignar registro
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reasignar registro</AlertDialogTitle>
        </AlertDialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <div>
              <span className="text-sm font-medium text-muted-foreground">
                Registro:{" "}
                <span className="font-semibold text-primary">
                  {record?.name || "Sin nombre"}
                </span>
              </span>
            </div>
            <div>
              <span className="text-sm font-medium text-muted-foreground">
                Propietario actual:{" "}
                <span className="font-semibold text-primary">
                  {record?.user?.name || "Sin agente asignado"}
                </span>
              </span>
            </div>
          </div>
          <LabeledSelect
            labelName="Nuevo agente"
            placeholder="Selecciona el nuevo agente"
            options={userOptions}
            value={selectedUserId}
            onValueChange={setSelectedUserId}
            disabled={isSubmitting}
          />
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isSubmitting}>
            Cancelar
          </AlertDialogCancel>
          <Button
            className="text-md sticky bottom-0 float-right ml-auto w-full sm:mr-8 sm:w-auto"
            variant="default"
            onClick={handleReassign}
            disabled={isSubmitting || !selectedUserId}
            isLoading={isSubmitting}
          >
            Confirmar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

ReassingRecordDialog.propTypes = {
  record: PropTypes.any,
}

export default ReassingRecordDialog
