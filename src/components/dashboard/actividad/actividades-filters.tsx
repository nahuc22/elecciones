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

export interface ActividadesFiltersValue {
  search: string;
  locality: string;
  type: string;
  responsible: string;
}

interface ActividadesFiltersProps {
  value: ActividadesFiltersValue;
  onChange: (value: ActividadesFiltersValue) => void;
  localities: string[];
  types: string[];
  responsibles: string[];
}

export function ActividadesFilters({
  value,
  onChange,
  localities,
  types,
  responsibles,
}: ActividadesFiltersProps): React.JSX.Element {
  const handleSelect = (key: keyof ActividadesFiltersValue) => (event: SelectChangeEvent) => {
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
        <Select displayEmpty onChange={handleSelect('type')} sx={{ minWidth: '160px' }} value={value.type}>
          <MenuItem value="">Tipo</MenuItem>
          {types.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
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
      </Stack>
    </Card>
  );
}
