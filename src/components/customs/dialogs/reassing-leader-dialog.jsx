import { Shuffle } from "lucide-react"
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
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"

import { Button } from "@/components/ui/button"
import { useGetGroupById, useReassignGroupLeader } from "@/hooks/queries"
import { useUserPermissions } from "@/hooks/useUserPermissions"

export const ReassignLeaderDialog = ({ currentLeaderName }) => {
  const [selectedUserId, setSelectedUserId] = useState("")
  const [selectedAgentType, setSelectedAgentType] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { group } = useUserPermissions()
  const groupId = group?.id || null

  const { data: response } = useGetGroupById({
    group_searchable_id: groupId,
    with_members: true,
  })

  const members = response?.data?.members ?? []
  const userOptions = members.map((member) => ({
    label: member.name,
    value: member.id,
  }))

  const agentTypeOptions = [
    { label: "Remote", value: "remote" },
    { label: "Callcenter", value: "callcenter" },
    { label: "Post", value: "post" },
  ]

  const { mutateAsync: reassingLeader } = useReassignGroupLeader({
    onError: () => toast.error("Error al asignar nuevo Líder"),
  })

  const handleConfirm = async () => {
    setIsSubmitting(true)
    try {
      await reassingLeader({
        group_id: groupId,
        new_leader_id: selectedUserId,
        ex_leader_new_type: selectedAgentType,
      })
      toast.success("Nuevo líder asignado con éxito")
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Reassign Leader failed", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    if (isDialogOpen) {
      setSelectedUserId("")
      setSelectedAgentType("")
    }
  }, [isDialogOpen])

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button size="icon" variant="outline">
          <Shuffle />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reasignar líder</AlertDialogTitle>
          <AlertDialogDescription />
        </AlertDialogHeader>

        <div className="space-y-4">
          <div>
            <p className="mb-1 text-sm font-medium text-muted-foreground">
              Selecciona el Agente a ascender:
            </p>
            <LabeledSelect
              labelName="Nuevo Líder"
              placeholder="Selecciona un usuario"
              options={userOptions}
              value={selectedUserId}
              onValueChange={setSelectedUserId}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <p className="mb-1 text-sm font-medium text-muted-foreground">
              Selecciona el nuevo tipo de Agente para:{" "}
              <span className="font-semibold text-primary">
                {currentLeaderName}
              </span>
            </p>
            <LabeledSelect
              labelName="Tipo de agente"
              placeholder="Selecciona un tipo"
              options={agentTypeOptions}
              value={selectedAgentType}
              onValueChange={setSelectedAgentType}
              disabled={isSubmitting}
            />
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isSubmitting}>
            Cancelar
          </AlertDialogCancel>
          <Button
            className="text-md sticky bottom-0 float-right ml-auto sm:mr-8"
            variant="default"
            isLoading={isSubmitting}
            onClick={handleConfirm}
            disabled={!selectedUserId || !selectedAgentType || isSubmitting}
          >
            {isSubmitting ? "Asignando..." : "Confirmar"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

ReassignLeaderDialog.propTypes = {
  currentLeaderName: PropTypes.string,
}

export default ReassignLeaderDialog
