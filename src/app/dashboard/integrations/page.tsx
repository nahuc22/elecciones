import { redirect } from 'next/navigation';

// Esta ruta legacy redirige al dashboard.
export default function Page(): never {
  redirect('/dashboard');
}
