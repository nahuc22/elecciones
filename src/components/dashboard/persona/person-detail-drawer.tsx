'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CalendarPlusIcon } from '@phosphor-icons/react/dist/ssr/CalendarPlus';
import { PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';
import { XIcon } from '@phosphor-icons/react/dist/ssr/X';
import dayjs from 'dayjs';

import type { Person, PersonStatus } from '@/lib/mock-data';
import { activitiesForPerson, personStatusColors, personStatusLabels } from '@/lib/mock-data';

interface PersonDetailDrawerProps {
  person: Person | null;
  open: boolean;
  onClose: () => void;
  onStatusChange?: (personId: string, status: PersonStatus) => void;
}

export function PersonDetailDrawer({ person, open, onClose, onStatusChange }: PersonDetailDrawerProps): React.JSX.Element {
  const activities = person ? activitiesForPerson(person.id) : [];

  return (
    <Drawer anchor="right" onClose={onClose} open={open} slotProps={{ paper: { sx: { width: { xs: '100%', sm: 420 } } } }}>
      {person ? (
        <Box sx={{ p: 3 }}>
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Detalle de persona</Typography>
            <IconButton onClick={onClose}>
              <XIcon />
            </IconButton>
          </Stack>

          <Stack spacing={2} sx={{ alignItems: 'center', mb: 3 }}>
            <Avatar src={person.avatar} sx={{ height: 72, width: 72 }} />
            <Typography variant="h6">{person.name}</Typography>
            <Chip color={personStatusColors[person.status]} label={personStatusLabels[person.status]} size="small" />
          </Stack>

          <Stack spacing={1.5} sx={{ mb: 3 }}>
            <DetailRow label="Teléfono" value={person.phone} />
            <DetailRow label="Email" value={person.email} />
            <DetailRow label="Dirección" value={person.address} />
            <DetailRow label="Localidad" value={person.locality} />
            <DetailRow label="Rol" value={person.role} />
            <DetailRow label="Responsable" value={person.responsible} />
            <DetailRow label="Fecha de registro" value={dayjs(person.registeredAt).format('DD MMM YYYY')} />
          </Stack>

          <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
            <Button fullWidth startIcon={<PencilSimpleIcon fontSize="var(--icon-fontSize-md)" />} variant="outlined">
              Editar
            </Button>
            <Button fullWidth startIcon={<CalendarPlusIcon fontSize="var(--icon-fontSize-md)" />} variant="outlined">
              Agregar actividad
            </Button>
          </Stack>

          <Stack spacing={1} sx={{ mb: 3 }}>
            <Typography color="text.secondary" variant="caption">
              Cambiar estado
            </Typography>
            <Select
              fullWidth
              onChange={(event) => onStatusChange?.(person.id, event.target.value as PersonStatus)}
              size="small"
              value={person.status}
            >
              {Object.entries(personStatusLabels).map(([key, label]) => (
                <MenuItem key={key} value={key}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </Stack>

          <Divider sx={{ mb: 2 }} />

          <Typography sx={{ mb: 2 }} variant="subtitle1">
            Historial de actividades
          </Typography>
          <Stack spacing={2}>
            {activities.length === 0 ? (
              <Typography color="text.secondary" variant="body2">
                Todavía no hay actividades registradas para esta persona.
              </Typography>
            ) : (
              activities.map((activity) => (
                <Box key={activity.id}>
                  <Typography color="text.secondary" variant="caption">
                    {dayjs(activity.date).format('DD MMM')}
                  </Typography>
                  <Typography variant="subtitle2">{activity.type}</Typography>
                  <Typography color="text.secondary" variant="body2">
                    {activity.description}
                  </Typography>
                </Box>
              ))
            )}
          </Stack>
        </Box>
      ) : null}
    </Drawer>
  );
}

function DetailRow({ label, value }: { label: string; value: string }): React.JSX.Element {
  return (
    <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
      <Typography color="text.secondary" variant="body2">
        {label}
      </Typography>
      <Typography variant="body2">{value}</Typography>
    </Stack>
  );
}
