import { EditIcon } from "lucide-react"
import PropTypes from "prop-types"
import React from "react"
import { Button } from "../ui"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export const CuentasCard = ({ accounts }) => {
  const HeaderContent = ({ title, description, status, onActionClick }) => (
    <div className="relative">
      <Button
        size="sm"
        variant="outline"
        className="absolute right-0 top-0"
        onClick={onActionClick}
      >
        <EditIcon className="h-4 w-4" />
      </Button>

      <div className="flex items-center gap-2 pr-16">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{title}</h3>
        <Badge variant={status}>
          <p className="-my-0.5 text-sm">{status}</p>
        </Badge>
      </div>
      <h4 className="scroll-m-20 font-light tracking-tight">{description}</h4>
    </div>
  )

  const DetailItem = ({ label, value }) => (
    <div className="flex items-center justify-between gap-2">
      <label className="flex items-center text-sm font-extralight leading-none">{label}</label>
      <span className="text-sm font-normal">{value}</span>
    </div>
  )

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {accounts.map((account, index) => (
        <Card key={index}>
          <CardHeader className="px-4 py-3">
            <HeaderContent
              title={account.title}
              description={account.description}
              status={account.status}
            />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <DetailItem label="Alias" value={account.data.alias} />
              <DetailItem label="Fuente" value={account.data.fuente} />
              <DetailItem label="Destino" value={account.data.destino} />
              <DetailItem label="Proveedor" value={account.data.proveedo} />
              <DetailItem label="Estatus" value={account.data.estatus} />
              <DetailItem label="Llave de AP" value={account.data.llaveDeAP} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

CuentasCard.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.object),
}

export default CuentasCard
