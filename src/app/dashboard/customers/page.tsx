import { redirect } from 'next/navigation';

import { paths } from '@/paths';

// Esta sección fue reemplazada por "Personas" (/dashboard/personas).
// Se mantiene esta ruta para no romper enlaces existentes.
export default function Page(): never {
  redirect(paths.dashboard.personas);
}
