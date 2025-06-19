import { Shuffle } from "lucide-react"
import React from "react"
import { useState } from "react"
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
  AlertDialogAction,
} from "@/components/ui/alert-dialog"

import { Button } from "@/components/ui/button"
import { useGetGroupById } from "@/hooks/queries"
import { useUserPermissions } from "@/hooks/useUserPermissions"

export const ReassignLeaderDialog = ({ currentLeaderName }) => {
  const [selectedUserId, setSelectedUserId] = useState("")
  const [selectedAgentType, setSelectedAgentType] = useState("")

  const { groupId } = useUserPermissions()

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

  const handleConfirm = () => {
    onSubmit?.({
      newLeaderId: selectedUserId,
      newAgentTypeId: selectedAgentType,
    })
  }

  return (
    <AlertDialog>
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
            />
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={!selectedUserId || !selectedAgentType}
          >
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ReassignLeaderDialog
