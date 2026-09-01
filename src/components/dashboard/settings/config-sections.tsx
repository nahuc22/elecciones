'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { CaretRightIcon } from '@phosphor-icons/react/dist/ssr/CaretRight';
import { GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';
import { MapPinIcon } from '@phosphor-icons/react/dist/ssr/MapPin';
import { ShieldCheckIcon } from '@phosphor-icons/react/dist/ssr/ShieldCheck';
import { TagIcon } from '@phosphor-icons/react/dist/ssr/Tag';
import { UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';

const sections = [
  { key: 'usuarios', label: 'Usuarios', description: 'Administrar cuentas de acceso a la plataforma', icon: UsersIcon },
  { key: 'roles', label: 'Roles', description: 'Definir roles como Voluntario, Referente o Coordinador', icon: ShieldCheckIcon },
  { key: 'estados', label: 'Estados', description: 'Personalizar los estados del ciclo de contacto', icon: TagIcon },
  { key: 'localidades', label: 'Localidades', description: 'Gestionar el listado de localidades disponibles', icon: MapPinIcon },
  { key: 'preferencias', label: 'Preferencias', description: 'Configuración general de la plataforma', icon: GearSixIcon },
] as const;

export function ConfigSections(): React.JSX.Element {
  return (
    <Card>
      <CardHeader subheader="Definir junto al equipo qué necesita administrarse en cada sección" title="Configuración general" />
      <Divider />
      <List disablePadding>
        {sections.map((section, index) => {
          const Icon = section.icon;

          return (
            <ListItem divider={index < sections.length - 1} key={section.key}>
              <ListItemIcon>
                <Icon fontSize="var(--icon-fontSize-lg)" />
              </ListItemIcon>
              <ListItemText primary={section.label} secondary={section.description} />
              <CaretRightIcon fontSize="var(--icon-fontSize-md)" />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
}
