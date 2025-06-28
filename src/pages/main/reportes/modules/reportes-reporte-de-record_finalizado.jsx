import React, { useState, useEffect, useRef } from "react";
import {
  groupConfig,
} from "@/components/customs/filter/filter-config";
import FilterToolbar from "@/components/customs/filter/filter-tool-bar";
import PageLayout from "@/components/customs/page-layout/page-layout";
import SectionHeader from "@/components/customs/section-header";
import { Card, CardContent, CardTitle } from "@/components/ui";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useGroupAndMembersFilter } from "@/hooks/useGroupAndMemebersFilter";
import { useGetFinalizedReport } from "@/hooks/queries/UseReports";
import { WithStatusState } from "@/components/customs/status-state/with-status-state";
import { DataTable } from "@/components/data-table";
import { toast } from "sonner";

export const ReporteReporteRecordFinalizado = () => {
  const { isAdmin, group } = useCurrentUser();
  const { values, onChange, listOfGroups } = useGroupAndMembersFilter({
    group_id: isAdmin ? "" : group?.id || "",
  });

  const [searchParams, setSearchParams] = useState(null);
  const [skip, setSkip] = useState(0);
  const limit = 100;

  const handleSearch = () => {
    if (!isAdmin && !values.group_id) {
      toast.error("Debes seleccionar un grupo");
      return;
    }

    setSearchParams({
      ...(isAdmin ? {} : { group_id: values.group_id }),
    });

    setSkip(0); // Reiniciar paginación
  };

  const { data, isLoading, isError } = useGetFinalizedReport(
    { skip, limit, ...searchParams },
    {
      enabled: !!searchParams,
    }
  );

  const registros = data?.records_and_orders ?? [];
  const total = data?.total ?? 0;

  const canGoNext = skip + limit < total;
  const canGoPrev = skip > 0;

  const goNext = () => {
    if (canGoNext) setSkip((prev) => prev + limit);
  };

  const goPrev = () => {
    if (canGoPrev) setSkip((prev) => prev - limit);
  };

  return (
    <PageLayout title="Reporte de Registros Finalizados">
      <Card>
        <CardContent>
          <SectionHeader
            title="Registros Finalizados"
            subtitle={
              searchParams && data?.group_name
                ? `Grupo: ${data.group_name}`
                : ""
            }
            className="pb-6"
            actions={
              <FilterToolbar
                filterConfig={isAdmin ? [] : [groupConfig]}
                values={values}
                onChange={onChange}
                context={{ groups: listOfGroups }}
                onSearch={handleSearch}
              />
            }
          />

          <WithStatusState
            isLoading={isLoading}
            isError={isError}
            hasFetched={!!searchParams}
          >
            {registros.length > 0 ? (
              <>
                <CardTitle className="mb-4">Registros encontrados</CardTitle>
                <DataTable
                  table={registros.map(([record, count]) => ({
                    ...record,
                    orderCount: count,
                  }))}
                  showPagination={false}
                  hasFetched
                />
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    className="btn btn-outline"
                    disabled={!canGoPrev}
                    onClick={goPrev}
                  >
                    Anterior
                  </button>
                  <button
                    className="btn btn-outline"
                    disabled={!canGoNext}
                    onClick={goNext}
                  >
                    Siguiente
                  </button>
                </div>
              </>
            ) : (
              <p className="text-center text-muted-foreground">
                No hay registros finalizados en este grupo.
              </p>
            )}
          </WithStatusState>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default ReporteReporteRecordFinalizado;