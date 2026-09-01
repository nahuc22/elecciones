import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { ArrowDownIcon } from '@phosphor-icons/react/dist/ssr/ArrowDown';
import { ArrowUpIcon } from '@phosphor-icons/react/dist/ssr/ArrowUp';
import { CurrencyDollarIcon } from '@phosphor-icons/react/dist/ssr/CurrencyDollar';
import { UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';

const iconMapping: Record<string, React.ElementType> = {
  currencyDollar: CurrencyDollarIcon,
  users: UsersIcon,
};

export interface BudgetProps {
  diff?: number;
  trend: 'up' | 'down';
  sx?: SxProps;
  value: string;
  title?: string;
  icon?: string;
  caption?: string;
}

export function Budget({
  diff,
  trend,
  sx,
  value,
  title = 'Budget',
  icon,
  caption = 'Since last month',
}: BudgetProps): React.JSX.Element {
  const TrendIcon = trend === 'up' ? ArrowUpIcon : ArrowDownIcon;
  const CardIcon = iconMapping[icon ?? 'currencyDollar'] ?? CurrencyDollarIcon;

  return (
    <Card sx={[{ bgcolor: 'var(--mui-palette-primary-main)', color: 'var(--mui-palette-common-white)' }, ...(Array.isArray(sx) ? sx : [sx])]}>
      <CardContent>
        <Stack spacing={3}>
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={1}>
              <Typography color="inherit" variant="overline">
                {title}
              </Typography>
              <Typography color="inherit" variant="h4">{value}</Typography>
            </Stack>
            <Avatar sx={{ backgroundColor: 'var(--mui-palette-primary-main)', height: '56px', width: '56px' }}>
              <CardIcon color="var(--mui-palette-common-white)" fontSize="var(--icon-fontSize-lg)" />
            </Avatar>
          </Stack>
          {diff ? (
            <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
              <Stack sx={{ alignItems: 'center' }} direction="row" spacing={0.5}>
                <TrendIcon color="var(--mui-palette-common-white)" fontSize="var(--icon-fontSize-md)" />
                <Typography color="inherit" variant="body2">
                  {diff}%
                </Typography>
              </Stack>
              <Typography color="inherit" variant="caption">
                {caption}
              </Typography>
            </Stack>
          ) : null}
        </Stack>
      </CardContent>
    </Card>
  );
}
