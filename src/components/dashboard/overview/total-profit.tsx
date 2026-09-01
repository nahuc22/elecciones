import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { ReceiptIcon } from '@phosphor-icons/react/dist/ssr/Receipt';

const iconMapping: Record<string, React.ElementType> = {
  receipt: ReceiptIcon,
  checkCircle: CheckCircleIcon,
};

export interface TotalProfitProps {
  sx?: SxProps;
  value: string;
  title?: string;
  icon?: string;
}

export function TotalProfit({ value, sx, title = 'Total Profit', icon }: TotalProfitProps): React.JSX.Element {
  const CardIcon = iconMapping[icon ?? 'receipt'] ?? ReceiptIcon;

  return (
    <Card sx={[{ bgcolor: 'var(--mui-palette-primary-main)', color: 'var(--mui-palette-common-white)' }, ...(Array.isArray(sx) ? sx : [sx])]}>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}
