import { EditIcon } from "lucide-react"
import PropTypes from "prop-types"
import React from "react"
import { Button } from "../ui"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { H3, H4, P, ListStyle, LabelStyle } from "@/components/ui/typography"

export const AccountsSettingsCard = ({ accounts }) => {
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
        <H3>{title}</H3>
        <Badge variant={status}>
          <P className="-my-0.5 text-sm">{status}</P>
        </Badge>
      </div>
      <H4 className={"font-light"}>{description}</H4>
    </div>
  )

  const DetailItem = ({ label, value }) => (
    <div className="flex items-center justify-between gap-2">
      <LabelStyle className={"font-extralight"}>{label}</LabelStyle>
      <ListStyle className="text-sm font-normal">{value}</ListStyle>
    </div>
  )

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {accounts.map((account, index) => (
        <Card key={index} type="single" collapsible>
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

AccountsSettingsCard.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default AccountsSettingsCard
