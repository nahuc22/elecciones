export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    overview: '/dashboard',
    account: '/dashboard/account',
    personas: '/dashboard/personas',
    localidades: '/dashboard/localidades',
    actividades: '/dashboard/actividades',
    settings: '/dashboard/settings',
    customers: '/dashboard/customers',
    integrations: '/dashboard/integrations',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
