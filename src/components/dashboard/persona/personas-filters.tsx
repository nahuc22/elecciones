'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import type { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';

export interface PersonasFiltersValue {
  search: string;
  locality: string;
  status: string;
  responsible: string;
  role: string;
}

interface PersonasFiltersProps {
  value: PersonasFiltersValue;
  onChange: (value: PersonasFiltersValue) => void;
  localities: string[];
  statuses: string[];
  responsibles: string[];
  roles: string[];
}

export function PersonasFilters({
  value,
  onChange,
  localities,
  statuses,
  responsibles,
  roles,
}: PersonasFiltersProps): React.JSX.Element {
  const handleSelect = (key: keyof PersonasFiltersValue) => (event: SelectChangeEvent) => {
    onChange({ ...value, [key]: event.target.value });
  };

  return (
    <Card sx={{ p: 2 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ flexWrap: 'wrap' }}>
        <OutlinedInput
          value={value.search}
          onChange={(event) => onChange({ ...value, search: event.target.value })}
          fullWidth
          placeholder="Buscar persona..."
          startAdornment={
            <InputAdornment position="start">
              <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
            </InputAdornment>
          }
          sx={{ maxWidth: { md: '320px' } }}
        />
        <Select displayEmpty onChange={handleSelect('locality')} sx={{ minWidth: '160px' }} value={value.locality}>
          <MenuItem value="">Localidad</MenuItem>
          {localities.map((locality) => (
            <MenuItem key={locality} value={locality}>
              {locality}
            </MenuItem>
          ))}
        </Select>
        <Select displayEmpty onChange={handleSelect('status')} sx={{ minWidth: '160px' }} value={value.status}>
          <MenuItem value="">Estado</MenuItem>
          {statuses.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
        <Select displayEmpty onChange={handleSelect('responsible')} sx={{ minWidth: '160px' }} value={value.responsible}>
          <MenuItem value="">Responsable</MenuItem>
          {responsibles.map((responsible) => (
            <MenuItem key={responsible} value={responsible}>
              {responsible}
            </MenuItem>
          ))}
        </Select>
        <Select displayEmpty onChange={handleSelect('role')} sx={{ minWidth: '160px' }} value={value.role}>
          <MenuItem value="">Rol</MenuItem>
          {roles.map((role) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </Select>
      </Stack>
    </Card>
  );
}
