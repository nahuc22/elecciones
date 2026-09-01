'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { ClockIcon } from '@phosphor-icons/react/dist/ssr/Clock';
import { DesktopIcon } from '@phosphor-icons/react/dist/ssr/Desktop';
import { DeviceTabletIcon } from '@phosphor-icons/react/dist/ssr/DeviceTablet';
import { PhoneIcon } from '@phosphor-icons/react/dist/ssr/Phone';
import type { ApexOptions } from 'apexcharts';

import { Chart } from '@/components/core/chart';

const iconMapping: Record<string, React.ElementType> = {
  desktop: DesktopIcon,
  tablet: DeviceTabletIcon,
  phone: PhoneIcon,
  clock: ClockIcon,
  arrowRight: ArrowRightIcon,
  checkCircle: CheckCircleIcon,
};

const defaultIconMapping = { Desktop: 'desktop', Tablet: 'tablet', Phone: 'phone' } as Record<string, string>;

export interface TrafficProps {
  chartSeries: number[];
  labels: string[];
  sx?: SxProps;
  title?: string;
  colors?: string[];
  icons?: Record<string, string>;
  iconColors?: string[];
}

export function Traffic({
  chartSeries,
  labels,
  sx,
  title = 'Traffic source',
  colors,
  icons,
  iconColors,
}: TrafficProps): React.JSX.Element {
  const chartOptions = useChartOptions(labels, colors);
  const iconKeyMapping = { ...defaultIconMapping, ...icons } as Record<string, string>;

  return (
    <Card sx={sx}>
      <CardHeader title={title} />
      <CardContent>
        <Stack spacing={2}>
          <Chart height={300} options={chartOptions} series={chartSeries} type="donut" width="100%" />
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'center' }}>
            {chartSeries.map((item, index) => {
              const label = labels[index];
              const iconKey = iconKeyMapping[label];
              const Icon = iconKey ? iconMapping[iconKey] : null;
              const iconColor = iconColors?.[index];

              return (
                <Stack key={label} spacing={0.5} sx={{ alignItems: 'center' }}>
                  {Icon ? <Icon color={iconColor} fontSize="var(--icon-fontSize-md)" /> : null}
                  <Typography sx={{ fontWeight: 500 }} variant="body2">
                    {label}
                  </Typography>
                  <Typography color="text.secondary" variant="caption">
                    {item}%
                  </Typography>
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

function useChartOptions(labels: string[], colors?: string[]): ApexOptions {
  const theme = useTheme();

  return {
    chart: { background: 'transparent' },
    colors: colors ?? [theme.palette.primary.main, theme.palette.success.main, theme.palette.warning.main],
    dataLabels: { enabled: false },
    labels,
    legend: { show: false },
    plotOptions: { pie: { expandOnClick: false } },
    states: { active: { filter: { type: 'none' } }, hover: { filter: { type: 'none' } } },
    stroke: { width: 0 },
    theme: { mode: theme.palette.mode },
    tooltip: { fillSeriesColor: false },
  };
}
