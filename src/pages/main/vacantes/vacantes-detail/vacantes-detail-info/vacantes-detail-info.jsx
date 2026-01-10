import {
  Briefcase,
  Calendar,
  CreditCard,
  Building,
  Mail,
  Phone,
  LinkIcon,
  FileText,
  CheckCircle2,
  List,
  Map,
  Building2
} from "lucide-react"
import PropTypes from "prop-types"
import React from "react"
import InfoSection from "@/components/customs/info-section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatDate, toTitleCase } from "@/utils/utils"

export const VacantesDetailInfo = ({ vacant }) => {
  const {
    id,
    visa_class,
    location_state_province,
    location_city_town,
    end_date,
    employer_name,
    employer_email,
    employer_phone,
    url,
    description,
    responsibilities,
    requirements,
    translated
  } = vacant

  // Construct items for InfoSection
  const generalInfoItems = [
    { label: "ID Vacante", value: id, icon: Briefcase },
    { label: "Tipo de Visa", value: visa_class, icon: CreditCard },
    {
      label: "Ciudad",
      value: location_city_town ? toTitleCase(location_city_town) : null,
      icon: Building2
    },
    {
      label: "Estado/Provincia",
      value: location_state_province ? toTitleCase(location_state_province) : null,
      icon: Map
    },
    { label: "Empleador", value: employer_name, icon: Building },
    { label: "Fecha Límite", value: formatDate(end_date), icon: Calendar },
    { label: "Email Contacto", value: employer_email?.toLowerCase(), icon: Mail },
    { label: "Teléfono", value: employer_phone, icon: Phone },
    {
      label: "Link de la Vacante",
      value: url ? <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline truncate">{url}</a> : null,
      icon: LinkIcon,
      fullWidth: true
    }
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      {/* General Information Grid */}
      <Card className="lg:col-span-2">
        <CardContent className="p-6">
          <InfoSection
            title="Información General"
            icon={Briefcase}
            items={generalInfoItems}
          />
        </CardContent>
      </Card>

      {/* Job Details Section */}
      <Card className="lg:col-span-1">
        <CardHeader className="!pb-0">
          <CardTitle className="text-xl flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Detalles del Puesto
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {!translated ? (
            <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground bg-muted/20 rounded-lg border border-dashed">
              <p>La descripción de este puesto aún no ha sido traducida.</p>
            </div>
          ) : (
            <>
              {description && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-lg flex items-center gap-2">
                    Descripción
                  </h4>
                  <Separator />
                  <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {description}
                  </div>
                </div>
              )}

              {responsibilities?.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-lg flex items-center gap-2">
                    <List className="h-5 w-5 text-blue-500" />
                    Responsabilidades
                  </h4>
                  <Separator />
                  <ul className="grid gap-2 pl-2">
                    {responsibilities.map((req, idx) => (
                      <li key={idx} className="flex gap-3 text-gray-700 dark:text-gray-300">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                        <span className="leading-relaxed">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {requirements?.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-lg flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    Requisitos
                  </h4>
                  <Separator />
                  <ul className="grid gap-2 pl-2">
                    {requirements.map((req, idx) => (
                      <li key={idx} className="flex gap-3 text-gray-700 dark:text-gray-300">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500" />
                        <span className="leading-relaxed">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

VacantesDetailInfo.propTypes = {
  vacant: PropTypes.object,
}

export default VacantesDetailInfo
