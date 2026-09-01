'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { mockActivities, mockLocalities } from '@/lib/mock-data';
import type { ActivityType } from '@/lib/mock-data';
import { ActividadesFilters } from '@/components/dashboard/actividad/actividades-filters';
import type { ActividadesFiltersValue } from '@/components/dashboard/actividad/actividades-filters';
import { ActividadesTable } from '@/components/dashboard/actividad/actividades-table';

const localityNames = mockLocalities.map((locality) => locality.name);
const activityTypes = [...new Set(mockActivities.map((activity) => activity.type))] as ActivityType[];
const responsibleNames = [...new Set(mockActivities.map((activity) => activity.responsible))];

const emptyFilters: ActividadesFiltersValue = { search: '', locality: '', type: '', responsible: '' };

export default function Page(): React.JSX.Element {
  const [filters, setFilters] = React.useState<ActividadesFiltersValue>(emptyFilters);

  const filtered = React.useMemo(() => {
    return mockActivities.filter((activity) => {
      const matchesSearch =
        filters.search.trim() === '' || activity.personName.toLowerCase().includes(filters.search.trim().toLowerCase());
      const matchesLocality = filters.locality === '' || activity.locality === filters.locality;
      const matchesType = filters.type === '' || activity.type === filters.type;
      const matchesResponsible = filters.responsible === '' || activity.responsible === filters.responsible;

      return matchesSearch && matchesLocality && matchesType && matchesResponsible;
    });
  }, [filters]);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Actividades</Typography>
          <Typography color="text.secondary" variant="body2">
            Registro de contactos, reuniones y seguimientos realizados.
          </Typography>
        </Stack>
        <div>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Nueva actividad
          </Button>
        </div>
      </Stack>
      <ActividadesFilters
        value={filters}
        onChange={setFilters}
        localities={localityNames}
        types={activityTypes}
        responsibles={responsibleNames}
      />
      <ActividadesTable rows={filtered} />
    </Stack>
  );
}
