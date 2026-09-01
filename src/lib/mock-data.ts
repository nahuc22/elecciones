// -----------------------------------------------------------------------------
// Datos mockeados / locales para el prototipo de gestión de personas y recursos.
// Esta estructura está centralizada a propósito: cuando exista un backend real,
// alcanza con reemplazar estas constantes por llamadas a la API sin tocar la UI.
// -----------------------------------------------------------------------------

import dayjs from 'dayjs';

export type PersonStatus = 'pendiente' | 'contactado' | 'seguimiento' | 'confirmado' | 'inactivo';

export const personStatusLabels: Record<PersonStatus, string> = {
  pendiente: 'Pendiente',
  contactado: 'Contactado',
  seguimiento: 'En seguimiento',
  confirmado: 'Confirmado',
  inactivo: 'Inactivo',
};

export const personStatusColors: Record<PersonStatus, 'default' | 'primary' | 'success' | 'warning' | 'error'> = {
  pendiente: 'default',
  contactado: 'primary',
  seguimiento: 'warning',
  confirmado: 'success',
  inactivo: 'error',
};

export type PersonRole = 'Voluntario' | 'Referente' | 'Coordinador' | 'Militante' | 'Simpatizante';

export interface Person {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  email: string;
  address: string;
  locality: string;
  role: PersonRole;
  responsible: string;
  status: PersonStatus;
  registeredAt: Date;
  lastActivityAt: Date;
}

export const mockLocalities: { name: string; persons: number; contacted: number; followUp: number; confirmed: number }[] = [
  { name: 'SMT', persons: 420, contacted: 310, followUp: 72, confirmed: 190 },
  { name: 'Yerba Buena', persons: 185, contacted: 140, followUp: 28, confirmed: 96 },
  { name: 'Tafí Viejo', persons: 127, contacted: 94, followUp: 21, confirmed: 63 },
  { name: 'Banda del Río Salí', persons: 96, contacted: 70, followUp: 18, confirmed: 42 },
  { name: 'Lules', persons: 74, contacted: 52, followUp: 14, confirmed: 31 },
  { name: 'Las Talitas', persons: 58, contacted: 39, followUp: 11, confirmed: 20 },
];

const localityNames = mockLocalities.map((l) => l.name);

const firstNames = [
  'Juan', 'María', 'Carlos', 'Ana', 'Lucía', 'Martín', 'Sofía', 'Diego', 'Valentina', 'Pedro',
  'Camila', 'Nicolás', 'Florencia', 'Emilio', 'Rocío', 'Federico', 'Julieta', 'Bruno', 'Agustina', 'Tomás',
];
const lastNames = [
  'Pérez', 'González', 'Gómez', 'Rodríguez', 'López', 'Fernández', 'Díaz', 'Martínez', 'Sosa', 'Romero',
  'Acosta', 'Herrera', 'Torres', 'Flores', 'Benítez', 'Aguirre', 'Medina', 'Ruiz', 'Ibáñez', 'Castro',
];
const roles: PersonRole[] = ['Voluntario', 'Referente', 'Coordinador', 'Militante', 'Simpatizante'];
const statuses: PersonStatus[] = ['pendiente', 'contactado', 'seguimiento', 'confirmado', 'inactivo'];
const responsibles = ['Carlos Gómez', 'Ana López', 'Federico Ruiz', 'Julieta Sosa', 'Bruno Aguirre'];

function seededPerson(index: number): Person {
  const first = firstNames[index % firstNames.length];
  const last = lastNames[(index * 3 + 1) % lastNames.length];
  const locality = localityNames[index % localityNames.length];
  const role = roles[index % roles.length];
  const status = statuses[index % statuses.length];
  const responsible = responsibles[index % responsibles.length];

  return {
    id: `PER-${String(index + 1).padStart(3, '0')}`,
    name: `${first} ${last}`,
    avatar: `/assets/avatar-${(index % 10) + 1}.png`,
    phone: `+54 381 ${400 + index}-${1000 + index * 7}`,
    email: `${first.toLowerCase()}.${last.toLowerCase()}@ejemplo.org`,
    address: `Calle Ficticia ${100 + index}`,
    locality,
    role,
    responsible,
    status,
    registeredAt: dayjs().subtract(index + 5, 'day').toDate(),
    lastActivityAt: dayjs().subtract(index % 10, 'day').toDate(),
  };
}

export const mockPersons: Person[] = Array.from({ length: 42 }, (_, index) => seededPerson(index));

export type ActivityType = 'Llamada' | 'Reunión' | 'Seguimiento' | 'Visita' | 'Actualización de datos' | 'Otro';

export interface Activity {
  id: string;
  personId: string;
  personName: string;
  type: ActivityType;
  description: string;
  responsible: string;
  locality: string;
  status: 'Completada' | 'Pendiente';
  date: Date;
}

const activityTypes: ActivityType[] = ['Llamada', 'Reunión', 'Seguimiento', 'Visita', 'Actualización de datos', 'Otro'];
const activityDescriptions: Record<ActivityType, string[]> = {
  Llamada: ['Se realizó contacto inicial', 'Se confirmó disponibilidad telefónica'],
  Reunión: ['Se coordinó una reunión', 'Reunión de presentación de propuestas'],
  Seguimiento: ['Se solicitó confirmar disponibilidad', 'Seguimiento de compromisos previos'],
  Visita: ['Visita domiciliaria de contacto', 'Visita para entrega de material'],
  'Actualización de datos': ['Se actualizaron datos de contacto', 'Se corrigió la dirección registrada'],
  Otro: ['Actividad varia registrada', 'Nota interna sobre la persona'],
};

export const mockActivities: Activity[] = Array.from({ length: 30 }, (_, index) => {
  const person = mockPersons[index % mockPersons.length];
  const type = activityTypes[index % activityTypes.length];
  const descriptions = activityDescriptions[type];

  return {
    id: `ACT-${String(index + 1).padStart(3, '0')}`,
    personId: person.id,
    personName: person.name,
    type,
    description: descriptions[index % descriptions.length],
    responsible: person.responsible,
    locality: person.locality,
    status: index % 4 === 0 ? 'Pendiente' : 'Completada',
    date: dayjs().subtract(index, 'day').toDate(),
  };
});

export function activitiesForPerson(personId: string): Activity[] {
  return mockActivities.filter((activity) => activity.personId === personId);
}

export type ResourceCategory = 'Materiales' | 'Folletos' | 'Credenciales' | 'Equipamiento' | 'Documentación';

export interface Resource {
  id: string;
  name: string;
  category: ResourceCategory;
  description: string;
  quantity: number;
  locality: string;
  updatedAt: Date;
}

export const mockResources: Resource[] = [
  {
    id: 'RES-001',
    name: 'Folletería institucional',
    category: 'Folletos',
    description: 'Folletos impresos con la propuesta general de la campaña.',
    quantity: 5000,
    locality: 'SMT',
    updatedAt: dayjs().subtract(2, 'day').toDate(),
  },
  {
    id: 'RES-002',
    name: 'Credenciales de fiscales',
    category: 'Credenciales',
    description: 'Credenciales identificatorias para fiscales de mesa.',
    quantity: 320,
    locality: 'Yerba Buena',
    updatedAt: dayjs().subtract(5, 'day').toDate(),
  },
  {
    id: 'RES-003',
    name: 'Banderas y pasacalles',
    category: 'Materiales',
    description: 'Material gráfico para actos y recorridas territoriales.',
    quantity: 150,
    locality: 'Tafí Viejo',
    updatedAt: dayjs().subtract(1, 'day').toDate(),
  },
  {
    id: 'RES-004',
    name: 'Equipos de sonido',
    category: 'Equipamiento',
    description: 'Parlantes y micrófonos para eventos de campaña.',
    quantity: 8,
    locality: 'Banda del Río Salí',
    updatedAt: dayjs().subtract(10, 'day').toDate(),
  },
  {
    id: 'RES-005',
    name: 'Manual del voluntario',
    category: 'Documentación',
    description: 'Guía interna con lineamientos para voluntarios y referentes.',
    quantity: 200,
    locality: 'Lules',
    updatedAt: dayjs().subtract(7, 'day').toDate(),
  },
  {
    id: 'RES-006',
    name: 'Remeras institucionales',
    category: 'Materiales',
    description: 'Indumentaria para militantes en actividades territoriales.',
    quantity: 600,
    locality: 'Las Talitas',
    updatedAt: dayjs().subtract(3, 'day').toDate(),
  },
];

export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

export const mockUsers: MockUser[] = [
  { id: 'USR-001', name: 'Nahu', email: 'nahu@gmail.com', role: 'Administrador', avatar: '/assets/avatar-nahu.png' },
  { id: 'USR-002', name: 'Carlos Gómez', email: 'carlos.gomez@ejemplo.org', role: 'Responsable de zona', avatar: '/assets/avatar-2.png' },
  { id: 'USR-003', name: 'Ana López', email: 'ana.lopez@ejemplo.org', role: 'Referente', avatar: '/assets/avatar-3.png' },
];

export const mockRoles = ['Voluntario', 'Referente', 'Coordinador', 'Militante', 'Simpatizante'];
export const mockStatuses = Object.values(personStatusLabels);
