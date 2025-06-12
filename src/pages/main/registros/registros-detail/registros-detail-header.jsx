import { Hash, Headset, Briefcase } from "lucide-react"
import React from "react"
import IconBadge from "@/components/customs/badge/icon-badge"
import StatusBadge from "@/components/customs/badge/status-badge"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"

export const RegistrosDetailHeader = (registro) => {
  return (
    <Card className="pb-6">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:justify-between">
          {/* Title + Status */}
          <div className="mb-2 items-center sm:flex sm:justify-center sm:space-x-2">
            <CardTitle className="text-primary">Lawrence Cannon</CardTitle>
            <StatusBadge status="Corregir Contrato" />
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}

export default RegistrosDetailHeader
