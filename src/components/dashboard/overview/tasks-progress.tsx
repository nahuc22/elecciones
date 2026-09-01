import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { CalendarCheckIcon } from '@phosphor-icons/react/dist/ssr/CalendarCheck';
import { ListBulletsIcon } from '@phosphor-icons/react/dist/ssr/ListBullets';

const iconMapping: Record<string, React.ElementType> = {
  listBullets: ListBulletsIcon,
  calendarCheck: CalendarCheckIcon,
};

export interface TasksProgressProps {
  sx?: SxProps;
  value: number;
  title?: string;
  icon?: string;
  suffix?: string;
  progress?: number;
}

export function TasksProgress({
  value,
  sx,
  title = 'Task Progress',
  icon,
  suffix = '%',
  progress,
}: TasksProgressProps): React.JSX.Element {
  const CardIcon = iconMapping[icon ?? 'listBullets'] ?? ListBulletsIcon;
  const progressValue = progress ?? value;

  return (
    <Card sx={[{ bgcolor: 'var(--mui-palette-warning-main)', color: 'var(--mui-palette-common-white)' }, ...(Array.isArray(sx) ? sx : [sx])]}>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={1}>
              <Typography color="inherit" gutterBottom variant="overline">
                {title}
              </Typography>
              <Typography color="inherit" variant="h4">{value}{suffix}</Typography>
            </Stack>
            <Avatar sx={{ backgroundColor: 'var(--mui-palette-warning-main)', height: '56px', width: '56px' }}>
              <CardIcon color="var(--mui-palette-common-white)" fontSize="var(--icon-fontSize-lg)" />
            </Avatar>
          </Stack>
          <div>
            <LinearProgress
              value={Math.min(progressValue, 100)}
              variant="determinate"
              sx={{ bgcolor: 'rgba(255, 255, 255, 0.35)', '& .MuiLinearProgress-bar': { bgcolor: 'var(--mui-palette-common-white)' } }}
            />
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
}
