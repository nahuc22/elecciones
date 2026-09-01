'use client';

import * as React from 'react';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';

import { mockLocalities } from '@/lib/mock-data';
import { LocalidadesTable } from '@/components/dashboard/localidad/localidades-table';
import { Sales } from '@/components/dashboard/overview/sales';

export default function Page(): React.JSX.Element {
  const [search, setSearch] = React.useState('');

  const filtered = React.useMemo(
    () => mockLocalities.filter((locality) => locality.name.toLowerCase().includes(search.trim().toLowerCase())),
    [search]
  );

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="h4">Localidades</Typography>
        <Typography color="text.secondary" variant="body2">
          Distribución de personas registradas por localidad.
        </Typography>
      </Stack>

      <OutlinedInput
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Buscar localidad..."
        startAdornment={
          <InputAdornment position="start">
            <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
          </InputAdornment>
        }
        sx={{ maxWidth: '400px' }}
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Sales
            title="Personas por localidad"
            actionLabel="Actualizar"
            footerLabel="Ver personas"
            categories={filtered.map((locality) => locality.name)}
            chartSeries={[
              { name: 'Personas', data: filtered.map((locality) => locality.persons) },
              { name: 'Confirmadas', data: filtered.map((locality) => locality.confirmed) },
            ]}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <LocalidadesTable rows={filtered} />
        </Grid>
      </Grid>
    </Stack>
  );
}
