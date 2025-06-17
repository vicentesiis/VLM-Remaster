import React from "react"
import PageLayout from "@/components/customs/page-layout/page-layout"
import { PLead, Lead, ListStyle, H4 } from "@/components/ui"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const vacancyDetail = {
  informacionGeneral: {
    id: "c8f3a2d917b9a5de",
    idPublico: "3a2f99abca7f42f1",
    pais: "Canada",
    tituloIngles: "General Farm Worker",
    tituloEspañol: "Trabajador General de Granja",
    categoria: "Agricultura",
    tipoVisa: "Temporary Foreign Worker Program (TFWP)",
  },
  descripcion: {
    descripcionOriginal:
      "Perform general farm duties such as planting, cultivating, harvesting crops and maintaining farm equipment. Must be able to work outdoors in various weather conditions and perform physically demanding tasks. No prior experience required but the ability to follow instructions and work in a team is essential.",
    descripcionModificada:
      "Realizar tareas generales en la granja como plantar, cultivar, cosechar cultivos y mantener el equipo agrícola. Se debe estar dispuesto a trabajar al aire libre en diversas condiciones climáticas y realizar tareas físicamente exigentes. No se requiere experiencia previa, pero es esencial seguir instrucciones y trabajar en equipo.",
  },
  informacionVacante: {
    sueldo: "$15.83 CAD por hora",
    periodoPago: "Quincenal",
    numeroPosiciones: "10",
  },
  ubicacion: {
    estadoProvincia: "Ontario",
    ciudadPueblo: "Leamington",
  },
  empleador: {
    empleador: "GreenFields Farm Inc.",
    contactoEmpleador: "hr@greenfieldsfarm.ca",
  },
  fechasEnlaces: {
    fechaVencimiento: "2025-07-01",
    ultimaActualizacion: "2025-04-14",
    urlOriginal: "https://greenfieldsfarm.ca/vacancies/general-farm-worker",
  },
}

export const Vacantes = () => {
  return (
    <PageLayout title="Vacantes">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Detalle</Button>
        </DialogTrigger>
        <DialogContent className="px-4 sm:px-12 h-[550px] overflow-y-auto sm:h-max sm:max-w-screen-xl sm:py-6">
          <DialogTitle className="mt-4 flex flex-col items-center gap-x-2 sm:flex-row">
            Vacante: {vacancyDetail.informacionGeneral.tituloEspañol} /{" "}
            {vacancyDetail.informacionGeneral.tituloIngles}
            <span className="ml-auto text-sm font-bold text-muted-foreground">
              URL:{" "}
              <a
                href={vacancyDetail.fechasEnlaces.urlOriginal}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                {vacancyDetail.fechasEnlaces.urlOriginal}
              </a>
            </span>
          </DialogTitle>
          <Lead className="-mt-2 flex flex-wrap items-center gap-x-2">
            <div className="flex flex-col">
              <div>
                ID:{" "}
                <span className="font-bold text-primary">
                  {vacancyDetail.informacionGeneral.id}
                </span>
              </div>
              <div>
                ID Público:{" "}
                <span className="font-bold text-primary">
                  {vacancyDetail.informacionGeneral.idPublico}
                </span>
              </div>
            </div>
            <span className="ml-auto text-sm font-bold text-muted-foreground">
              Última actualización:{" "}
              <span className="font-bold text-primary">
                {vacancyDetail.fechasEnlaces.ultimaActualizacion}
              </span>
            </span>
          </Lead>
          <div className="space-y-8">
            {/* Informacion General */}
            <div>
              <H4 className="font-bold">Visa</H4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Detail
                  label="Tipo de Visa"
                  value={vacancyDetail.informacionGeneral.tipoVisa}
                />
                <Detail
                  label="Categoría"
                  value={vacancyDetail.informacionGeneral.categoria}
                />
              </div>
            </div>
            <div className="space-y-2">
              {/* Ubicación */}
              <H4 className="font-bold">Ubicación</H4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Detail
                  label="País"
                  value={vacancyDetail.informacionGeneral.pais}
                />
                <Detail
                  label="Estado/Provincia"
                  value={vacancyDetail.ubicacion.estadoProvincia}
                />
                <Detail
                  label="Ciudad/Pueblo"
                  value={vacancyDetail.ubicacion.ciudadPueblo}
                />
              </div>
            </div>
            <div className="space-y-2">
              {/* Datos del Empleo */}
              <H4 className="font-bold">Datos del Empleo</H4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Detail
                  label="Empleador"
                  value={vacancyDetail.empleador.empleador}
                />
                <Detail
                  label="Contacto del Empleador"
                  value={vacancyDetail.empleador.contactoEmpleador}
                />
                <Detail
                  label="Número de Posiciones"
                  value={vacancyDetail.informacionVacante.numeroPosiciones}
                />
                <Detail
                  label="Sueldo"
                  value={vacancyDetail.informacionVacante.sueldo}
                />
                <Detail
                  label="Periodo de Pago"
                  value={vacancyDetail.informacionVacante.periodoPago}
                />
                <Detail
                  label="Fecha de Vencimiento"
                  value={vacancyDetail.fechasEnlaces.fechaVencimiento}
                />
              </div>
            </div>
            <div className="space-y-2">
              {/* Descripción */}
              <H4 className="font-bold">Descripción</H4>
              <div className="space-y-6">
                <Detail
                  label="Descripción Original"
                  value={vacancyDetail.descripcion.descripcionOriginal}
                  multiline
                />
                <Detail
                  label="Descripción Modificada"
                  value={vacancyDetail.descripcion.descripcionModificada}
                  multiline
                />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </PageLayout>
  )
}

const Detail = ({ label, value, multiline = false }) => (
  <div>
    <PLead className="text-sm">{label}</PLead>
    <ListStyle
      className={`text-sm font-bold ${multiline ? "whitespace-pre-line" : ""}`}
    >
      {value || "-"}
    </ListStyle>
  </div>
)

export default Vacantes
