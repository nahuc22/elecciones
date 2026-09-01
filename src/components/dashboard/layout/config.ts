import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'personas', title: 'Personas', href: paths.dashboard.personas, icon: 'users' },
  { key: 'localidades', title: 'Localidades', href: paths.dashboard.localidades, icon: 'map-pin' },
  { key: 'actividades', title: 'Actividades', href: paths.dashboard.actividades, icon: 'calendar-check' },
  { key: 'settings', title: 'Configuración', href: paths.dashboard.settings, icon: 'gear-six' },
  { key: 'account', title: 'Account', href: paths.dashboard.account, icon: 'user' },
] satisfies NavItemConfig[];
