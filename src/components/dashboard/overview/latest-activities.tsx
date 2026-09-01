import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import type { SxProps } from '@mui/material/styles';
import { ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { CalendarCheckIcon } from '@phosphor-icons/react/dist/ssr/CalendarCheck';
import { NotePencilIcon } from '@phosphor-icons/react/dist/ssr/NotePencil';
import { PhoneIcon } from '@phosphor-icons/react/dist/ssr/Phone';
import { UsersFourIcon } from '@phosphor-icons/react/dist/ssr/UsersFour';
import dayjs from 'dayjs';

import type { ActivityType } from '@/lib/mock-data';

const activityIcon: Partial<Record<ActivityType, React.ElementType>> = {
  Llamada: PhoneIcon,
  Reunión: UsersFourIcon,
  Seguimiento: CalendarCheckIcon,
  'Actualización de datos': NotePencilIcon,
};

export interface LatestActivityItem {
  id: string;
  personName: string;
  type: ActivityType;
  date: Date;
}

export interface LatestActivitiesProps {
  activities?: LatestActivityItem[];
  sx?: SxProps;
}

export function LatestActivities({ activities = [], sx }: LatestActivitiesProps): React.JSX.Element {
  return (
    <Card sx={sx}>
      <CardHeader title="Últimas actividades" />
      <Divider />
      <List>
        {activities.map((activity, index) => {
          const Icon = activityIcon[activity.type] ?? CalendarCheckIcon;

          return (
            <ListItem divider={index < activities.length - 1} key={activity.id}>
              <ListItemAvatar>
                <Avatar sx={{ backgroundColor: 'var(--mui-palette-neutral-100)', color: 'var(--mui-palette-text-primary)' }}>
                  <Icon fontSize="var(--icon-fontSize-md)" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`${activity.personName} — ${activity.type}`}
                primaryTypographyProps={{ variant: 'subtitle1' }}
                secondary={dayjs(activity.date).format('DD MMM')}
                secondaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
          size="small"
          variant="text"
        >
          Ver todas
        </Button>
      </CardActions>
    </Card>
  );
}
