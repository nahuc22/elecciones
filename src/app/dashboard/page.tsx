import * as React from 'react';
import type { Metadata } from 'next';
import Grid from '@mui/material/Grid';

import { config } from '@/config';
import { mockActivities, mockLocalities, mockPersons } from '@/lib/mock-data';
import { Budget } from '@/components/dashboard/overview/budget';
import { LatestActivities } from '@/components/dashboard/overview/latest-activities';
import { Sales } from '@/components/dashboard/overview/sales';
import { TasksProgress } from '@/components/dashboard/overview/tasks-progress';
import { TotalCustomers } from '@/components/dashboard/overview/total-customers';
import { TotalProfit } from '@/components/dashboard/overview/total-profit';
import { Traffic } from '@/components/dashboard/overview/traffic';

export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;

const totalPersons = mockPersons.length;
const followUp = mockPersons.filter((p) => p.status === 'seguimiento').length;
const confirmed = mockPersons.filter((p) => p.status === 'confirmado').length;

const statusCounts = {
  pendiente: mockPersons.filter((p) => p.status === 'pendiente').length,
  contactado: mockPersons.filter((p) => p.status === 'contactado').length,
  seguimiento: followUp,
  confirmado: confirmed,
  inactivo: mockPersons.filter((p) => p.status === 'inactivo').length,
};

export default function Page(): React.JSX.Element {
  return (
    <Grid container spacing={3}>
      <Grid size={{ lg: 3, sm: 6, xs: 12 }}>
        <Budget
          diff={12}
          trend="up"
          sx={{ height: '100%' }}
          value={String(1284)}
          title="Personas registradas"
          icon="users"
          caption="respecto al período anterior"
        />
      </Grid>
      <Grid size={{ lg: 3, sm: 6, xs: 12 }}>
        <TotalCustomers
          diff={12}
          trend="up"
          sx={{ height: '100%' }}
          value={String(986)}
          title="Personas contactadas"
          icon="phone"
          caption="respecto al período anterior"
        />
      </Grid>
      <Grid size={{ lg: 3, sm: 6, xs: 12 }}>
        <TasksProgress
          sx={{ height: '100%' }}
          value={214}
          title="En seguimiento"
          suffix=""
          progress={(followUp / totalPersons) * 100}
          icon="calendarCheck"
        />
      </Grid>
      <Grid size={{ lg: 3, sm: 6, xs: 12 }}>
        <TotalProfit sx={{ height: '100%' }} value={String(642)} title="Confirmadas" icon="checkCircle" />
      </Grid>
      <Grid size={{ lg: 8, xs: 12 }}>
        <Sales
          title="Personas registradas por localidad"
          actionLabel="Actualizar"
          footerLabel="Ver localidades"
          categories={mockLocalities.map((locality) => locality.name)}
          chartSeries={[{ name: 'Personas', data: mockLocalities.map((locality) => locality.persons) }]}
          sx={{ height: '100%' }}
        />
      </Grid>
      <Grid size={{ lg: 4, xs: 12 }}>
        <Traffic
          title="Estado de las personas"
          chartSeries={[statusCounts.pendiente, statusCounts.contactado, statusCounts.seguimiento, statusCounts.confirmado]}
          labels={['Pendiente', 'Contactado', 'En seguimiento', 'Confirmado']}
          colors={[
            'var(--mui-palette-info-main)',
            'var(--mui-palette-success-main)',
            'var(--mui-palette-warning-main)',
            'var(--mui-palette-success-dark)',
          ]}
          icons={{ Pendiente: 'clock', Contactado: 'phone', 'En seguimiento': 'arrowRight', Confirmado: 'checkCircle' }}
          iconColors={[
            'var(--mui-palette-info-main)',
            'var(--mui-palette-success-main)',
            'var(--mui-palette-warning-main)',
            'var(--mui-palette-success-dark)',
          ]}
          sx={{ height: '100%' }}
        />
      </Grid>
      <Grid size={{ lg: 12, xs: 12 }}>
        <LatestActivities
          activities={mockActivities.slice(0, 6).map((activity) => ({
            id: activity.id,
            personName: activity.personName,
            type: activity.type,
            date: activity.date,
          }))}
          sx={{ height: '100%' }}
        />
      </Grid>
    </Grid>
  );
}
